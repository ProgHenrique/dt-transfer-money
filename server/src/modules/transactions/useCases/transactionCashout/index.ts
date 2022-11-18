import { AccountsRepository } from "../../../users/infra/prisma/repositories/AccountsRepository";
import { UsersRepository } from "../../../users/infra/prisma/repositories/UsersRepository";
import { TransactionsRepository } from "../../infra/prisma/repositories/TransactionsRepository";
import { TransactionCashoutController } from "./TransactionCashoutController";
import { TransactionCashoutUseCase } from "./TransactionCashoutUseCase";

export const TransactionCashoutInicialize = () => {
  const userRepository = new UsersRepository()
  const accountsRepository = new AccountsRepository()
  const transactionRepository = new TransactionsRepository()
  const transactionCashoutUseCase = new TransactionCashoutUseCase(userRepository, accountsRepository, transactionRepository)
  const transactionCashoutController = new TransactionCashoutController(transactionCashoutUseCase);

  return transactionCashoutController
}