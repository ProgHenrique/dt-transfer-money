import { AccountsRepository } from "../../../users/infra/prisma/repositories/AccountsRepository"
import { TransactionsRepository } from "../../infra/prisma/repositories/TransactionsRepository"
import { TransactionsFilterController } from "./TransactionsFilterController"
import { TransactionsFilterUseCase } from "./TransactionsFilterUseCase"


export const TransactionsFilterInicialize = () => {
  const accountsRepository = new AccountsRepository()
  const transactionsRepository = new TransactionsRepository()
  const transactionsFilterUseCase = new TransactionsFilterUseCase(accountsRepository, transactionsRepository)
  const transactionsFilterController = new TransactionsFilterController(transactionsFilterUseCase)

  return transactionsFilterController
}