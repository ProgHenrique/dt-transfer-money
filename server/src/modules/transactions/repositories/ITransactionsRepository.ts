export interface ICreateTransactionDTO {
  value: number;
  creditedAccountId: string;
  debitedAccountId: string;
}

export interface Transaction {
  id: string;
  value: number;
  debitedAccountId: string;
  creditedAccountId: string;
  createdAt: Date;
}

export interface IFindTransaction {
  date: Date;
  id: string;
  skip: number;
}

export interface ITransactionsRepository {

  create(data: ICreateTransactionDTO): Promise<Transaction>
  findByDate({ date, id, skip }: IFindTransaction): Promise<Transaction[]>
  findByTypeCashin({ id, date, skip }: IFindTransaction): Promise<Transaction[]>
  findByTypeCashout({ id, date, skip }: IFindTransaction): Promise<Transaction[]>
}