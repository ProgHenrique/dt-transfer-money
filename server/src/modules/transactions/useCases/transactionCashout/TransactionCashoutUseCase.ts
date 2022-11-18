import { AppError } from "../../../../errors/AppError";
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IAccountsRepository } from "../../../users/repositories/IAccountsRepository";
import { getBalance } from "../../../../utils/getBalance";

interface IRequest {
  id: string;
  usernameToCashin: string;
  valueStatement: number;
}

export class TransactionCashoutUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private accountsRepository: IAccountsRepository,
    private transactionRepository: ITransactionsRepository
  ) {}

  async execute({ id, usernameToCashin, valueStatement }: IRequest) {
    const userCashout = await this.userRepository.findById(id)
    const userCashin = await this.userRepository.findByUsername(usernameToCashin)
    const balanceAccount = await this.accountsRepository.getUserAccountBalance(userCashout.accountId)

    if (!userCashin) {
      throw new AppError(`${usernameToCashin} não é um usuário válido`)
    }

    if (valueStatement < 1) {
      throw new AppError("Transaction must be greater than zero")
    }

    if (valueStatement > balanceAccount.balance) {
      throw new AppError("Insufficient funds available to complete this transaction")
    }

    const dataToTransaction = {
      value: valueStatement,
      creditedAccountId: userCashin.accountId,
      debitedAccountId: userCashout.accountId
    }

    if (dataToTransaction.creditedAccountId === userCashout.accountId) {
      throw new AppError("Is not possible to transfer for your own account")
    }

    const transaction = await this.transactionRepository.create(dataToTransaction)

    const proof = {
      transaction,
      usernameCashin: userCashin.username
    }

    return proof
  }
}