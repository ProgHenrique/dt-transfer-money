import { Router } from 'express';
import { transactionRoutes } from './transactions/transaction.routes';
import { userRoutes } from './user/user.routes';

export const router = Router();

router.use("/user", userRoutes)
router.use("/transaction", transactionRoutes)