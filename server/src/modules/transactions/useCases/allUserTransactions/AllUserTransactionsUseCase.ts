import { IAccountsRepository } from "../../../users/repositories/IAccountsRepository"
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository"

interface FilterTransaction {
  date?: string
  id: string
  type?: string
  skip?: string
}

export class AllUserTransactionsUseCase {

  constructor(
    private accountsRepository: IAccountsRepository,
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute({ id, date, type, skip }: FilterTransaction) {

    const dateFormat = new Date(date + " 00:00")
    const skipNumber = skip === undefined ? -1 : parseInt(skip)
    const accountBalance = await this.accountsRepository.getAccountBalanceByUsernameId(id)

    if (type) {
      const transactions = type === 'cashin' ? await this.transactionsRepository.findByTypeCashin({ id: accountBalance.id, date: dateFormat, skip: skipNumber }) : await this.transactionsRepository.findByTypeCashout({ id: accountBalance.id, date: dateFormat, skip: skipNumber })
      return transactions
    } else {
      const transactions = await this.transactionsRepository.findByDate({ date: dateFormat, id: accountBalance.id, skip: skipNumber })
      return transactions
    }
  }
}