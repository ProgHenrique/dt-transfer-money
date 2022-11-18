import { Transactions } from "@prisma/client";

export function getBalance(statement: Transactions[], id: string) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.creditedAccountId === id) {
      return acc + operation.value;
    } else {
      return acc - operation.value;
    }
  }, 100)

  return balance
}