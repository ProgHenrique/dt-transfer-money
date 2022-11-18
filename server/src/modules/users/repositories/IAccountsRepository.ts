export interface Account {
  id: string;
  balance: number;
}
export interface IAccountsRepository {
  getUserAccountBalance(id: string): Promise<Account>
  getAccountBalanceByUsernameId(id: string): Promise<Account>
}