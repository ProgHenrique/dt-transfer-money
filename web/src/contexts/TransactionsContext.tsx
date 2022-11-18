import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'
import { api } from '../lib/axios'
import { AuthContext } from './AuthContext'

interface Transaction {
  id: string
  value: number
  debitedAccountId: string
  creditedAccountId: string
  createdAt: string
}

interface CreateTransactionInput {
  username: string
  value: number
}
interface QueryParams {
  query: string | undefined
  typeTransaction: string | undefined
}

interface TransactionContextType {
  transactions: Transaction[]
  transactionsAll: Transaction[]
  queryparams: QueryParams
  fetchTransactions: (query?: string, typeTransaction?: string) => Promise<void>
  fetchTransactionsAll: (
    query?: string,
    typeTransaction?: string,
  ) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  setWhatIsTheCurrentPage: (pageNumber: number) => void
  setCurrentQueryParams: (query?: string, typeTransaction?: string) => void
  transactionsByType: (type: string) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const { userToken, userBalance, updateBalance } = useContextSelector(
    AuthContext,
    (context) => {
      return {
        userToken: context.userToken,
        userBalance: context.userBalance,
        updateBalance: context.updateBalance,
      }
    },
  )
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsAll, setTransactionsAll] = useState<Transaction[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [queryparams, setQueryparams] = useState<QueryParams>({
    query: '',
    typeTransaction: '',
  })

  const fetchTransactionsAll = useCallback(
    async (query?: string, typeTransaction?: string) => {
      try {
        const responseAll = await api.get('transaction/filter', {
          params: {
            date: query,
            type: typeTransaction,
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        setTransactionsAll(responseAll.data)
      } catch (error: any) {}
    },
    [userToken],
  )

  const fetchTransactions = useCallback(
    async (query?: string, typeTransaction?: string) => {
      const response = await api.get('transaction/filter', {
        params: {
          date: query,
          type: typeTransaction,
          skip: currentPage * 10,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      setTransactions(response.data)
    },
    [currentPage, userToken],
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { username, value } = data

      try {
        const response = await api.post(
          'transaction/create',
          {
            username,
            value,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        )

        if (currentPage > 0) {
          return
        }

        setTransactions((state) => {
          if (state.length > 9) {
            state.splice(9, 1)
            return [response.data.transaction, ...state]
          } else {
            return [response.data.transaction, ...state]
          }
        })
        fetchTransactionsAll()
        updateBalance()
      } catch (error: any) {
        alert(`Ocorreu um Erro inesperado
        verifique o nome de usuário e seu saldo`)
      }
    },
    [currentPage, fetchTransactionsAll, updateBalance, userToken],
  )

  const transactionsByType = useCallback(
    async (type: string) => {
      const responseAll = await api.get('transactions/type/all', {
        params: {
          type,
        },
      })

      setTransactionsAll(responseAll.data)

      const response = await api.get('transactions/type', {
        params: {
          type,
          skip: currentPage * 10,
        },
      })

      setTransactions(response.data)
    },
    [currentPage],
  )

  function setWhatIsTheCurrentPage(pageNumber: number) {
    setCurrentPage(pageNumber)
  }

  function setCurrentQueryParams(query?: string, typeTransaction?: string) {
    setQueryparams({ query, typeTransaction })
  }

  useEffect(() => {
    if (userBalance > -1) {
      fetchTransactionsAll()
    }
  }, [fetchTransactionsAll, userBalance])

  useEffect(() => {
    if (userBalance > -1) {
      fetchTransactions()
    }
  }, [fetchTransactions, userBalance])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionsAll,
        queryparams,
        fetchTransactions,
        fetchTransactionsAll,
        createTransaction,
        setWhatIsTheCurrentPage,
        setCurrentQueryParams,
        transactionsByType,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
