import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '../contexts/AuthContext'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const accountId = useContextSelector(AuthContext, (context) => {
    return context.accountId
  })
  const transactionsAll = useContextSelector(TransactionsContext, (context) => {
    return context.transactionsAll
  })

  const summary = useMemo(() => {
    return transactionsAll.reduce(
      (acc, transaction) => {
        if (transaction.creditedAccountId === accountId) {
          acc.cashin += transaction.value
        } else {
          acc.cashout += transaction.value
        }

        return acc
      },
      { cashin: 0, cashout: 0, total: 0 },
    )
  }, [accountId, transactionsAll])

  return summary
}
