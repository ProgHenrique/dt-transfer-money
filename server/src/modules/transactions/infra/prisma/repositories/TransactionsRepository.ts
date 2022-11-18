import isValid from "date-fns/isValid";
import { prisma } from "../../../../../database/prismaclient";
import { addOneDay } from "../../../../../utils/dateFns";
import { ICreateTransactionDTO, IFindTransaction, ITransactionsRepository, Transaction } from "../../../repositories/ITransactionsRepository";


export class TransactionsRepository implements ITransactionsRepository {

  async create({ value, creditedAccountId, debitedAccountId }: ICreateTransactionDTO): Promise<Transaction> {
    const newTransaction = await prisma.transactions.create({
      data: {
        creditedAccountId,
        value,
        debitedAccountId
      }
    })

    return newTransaction
  }



  async findByDate({ date, id, skip }: IFindTransaction): Promise<Transaction[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: isValid(date) ? date : new Date(2022, 1, 1),
              lte: isValid(date) ? addOneDay(date) : undefined,
            },
          },
          {
            OR: [
              {
                creditedAccountId: {
                  equals: id
                }
              },
              {
                debitedAccountId: {
                  equals: id
                }
              }
            ],
          }
        ]

      },
      orderBy: {
        createdAt: 'desc'
      },
      take: skip < 0 ? 200000 : 10,
      skip: skip < 0 ? 0 : skip

    })

    return transactions
  }

  async findByTypeCashin({ date, id, skip }: IFindTransaction): Promise<Transaction[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: isValid(date) ? date : new Date(2022, 1, 1),
              lte: isValid(date) ? addOneDay(date) : undefined,
            },
          },
          {
            creditedAccountId: {
              equals: id
            }
          }
        ]

      },
      orderBy: {
        createdAt: 'desc'
      },
      take: skip < 0 ? 200000 : 10,
      skip: skip < 0 ? 0 : skip

    })

    return transactions

  }
  async findByTypeCashout({ date, id, skip }: IFindTransaction): Promise<Transaction[]> {
    console.log('entrou no findBy')
    const transactions = await prisma.transactions.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: isValid(date) ? date : new Date(2022, 1, 1),
              lte: isValid(date) ? addOneDay(date) : undefined,
            },
          },
          {
            debitedAccountId: {
              equals: id
            }
          }
        ]

      },
      orderBy: {
        createdAt: 'desc'
      },
      take: skip < 0 ? 200000 : 10,
      skip: skip < 0 ? 0 : skip

    })

    return transactions
  }
}