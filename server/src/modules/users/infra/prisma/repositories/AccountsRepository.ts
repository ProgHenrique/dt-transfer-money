import { prisma } from "../../../../../database/prismaclient";
import { Account, IAccountsRepository } from "../../../repositories/IAccountsRepository";


export class AccountsRepository implements IAccountsRepository {

  async getUserAccountBalance(id: string): Promise<Account> {
    const userAccountBalance = await prisma.accounts.findUnique({
      where: {
        id
      }
    })

    return userAccountBalance!
  }

  async getAccountBalanceByUsernameId(id: string): Promise<Account> {
    const account = await prisma.accounts.findFirst({
      where: {
        user: {
          id
        }
      }
    })

    return account!
  }
}