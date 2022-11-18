import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prismaclient";
import { AppError } from "../errors/AppError";
import { getBalance } from "../utils/getBalance";

export async function setBalance(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;
  const accountBalance = await prisma.accounts.findFirst({
    where: {
      user: {
        id
      }
    }
  })

  if (!accountBalance) {
    throw new AppError("Account not found")
  }
  const transactions = await prisma.transactions.findMany({
    where: {
      OR: [
        {
          creditedAccountId: {
            equals: accountBalance.id
          }
        },
        {
          debitedAccountId: {
            equals: accountBalance.id
          }
        }
      ],
    }
  })
  const balance = getBalance(transactions, accountBalance.id)

  await prisma.accounts.update({
    where: {
      id: accountBalance.id
    },

    data: {
      balance
    }
  })

  next()

}