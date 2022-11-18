import { AccountsRepository } from "../../../users/infra/prisma/repositories/AccountsRepository"
import { TransactionsRepository } from "../../infra/prisma/repositories/TransactionsRepository"
import { AllUserTransactionsController } from "./AllUserTransactionsController"
import { AllUserTransactionsUseCase } from "./AllUserTransactionsUseCase"


export const AllUserTransactionsInicialize = () => {
  const accountsRepository = new AccountsRepository()
  const transactionsRepository = new TransactionsRepository()
  const allUserTransactionsUseCase = new AllUserTransactionsUseCase(accountsRepository, transactionsRepository)
  const allUserTransactionsController = new AllUserTransactionsController(allUserTransactionsUseCase)

  return allUserTransactionsController
}