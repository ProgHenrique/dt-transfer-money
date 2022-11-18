import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IAccountsRepository } from '../../repositories/IAccountsRepository';


export class UserBalanceUseCase {

  constructor(
    private userRepository: IUsersRepository,
    private accountsRepository: IAccountsRepository
  ) {}

  async execute(id: string): Promise<number> {
    const user = await this.userRepository.findById(id)
    const userAccountBalance = await this.accountsRepository.getUserAccountBalance(user.accountId)

    return userAccountBalance.balance
  }
}