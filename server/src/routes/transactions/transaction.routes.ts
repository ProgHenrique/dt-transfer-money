import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticate";
import { setBalance } from "../../middlewares/setBalance";
import { AllUserTransactionsInicialize } from "../../modules/transactions/useCases/allUserTransactions";
import { TransactionCashoutInicialize } from "../../modules/transactions/useCases/transactionCashout";
import { TransactionsFilterInicialize } from "../../modules/transactions/useCases/transactionsFilter";

export const transactionRoutes = Router();

const transactionCashoutController = TransactionCashoutInicialize()
const allUserTransactionsController = AllUserTransactionsInicialize()
const transactionsFilterController = TransactionsFilterInicialize()

transactionRoutes.post("/create", ensureAuthenticated, setBalance,
  (request, response) => transactionCashoutController.handle(request, response))

transactionRoutes.get("/all", ensureAuthenticated,
  (request, response) => allUserTransactionsController.handle(request, response))

transactionRoutes.get("/filter", ensureAuthenticated,
  (request, response) => transactionsFilterController.handle(request, response))

