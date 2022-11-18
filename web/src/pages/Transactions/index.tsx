import { CalendarBlank } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { AuthContext } from '../../contexts/AuthContext'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useWindowSize } from '../../hooks/useWindowSize'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  MainDiv,
  PaginationButton,
  PaginationContainer,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

interface Page {
  number: number
  disabled: boolean
}

export function Transactions() {
  const accountId = useContextSelector(AuthContext, (context) => {
    return context.accountId
  })
  const {
    fetchTransactions,
    transactions,
    transactionsAll,
    setWhatIsTheCurrentPage,
    queryparams,
  } = useContextSelector(TransactionsContext, (context) => {
    return {
      transactions: context.transactions,
      fetchTransactions: context.fetchTransactions,
      transactionsAll: context.transactionsAll,
      setWhatIsTheCurrentPage: context.setWhatIsTheCurrentPage,
      queryparams: context.queryparams,
    }
  })

  const windowSize = useWindowSize()
  const [pages, setPages] = useState<Page[]>([])
  const numberOfPages = Math.ceil(transactionsAll.length / 10)

  useEffect(() => {
    const pages = Array.from(Array(numberOfPages).keys())
    setPages((state) => {
      return pages.map((numberPage) => {
        return {
          number: numberPage,
          disabled: numberPage === 0,
        }
      })
    })
  }, [transactionsAll, numberOfPages])

  async function handlePaginationTransactions(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    const pageIndexDisabled = pages.findIndex((page) => page.disabled === true)
    pages[pageIndexDisabled].disabled = false

    const pageNumber = Number(event.currentTarget.textContent) - 1

    const pageIndexNumber = pages.findIndex(
      (page) => page.number === pageNumber,
    )

    if (pages[pageIndexNumber].disabled) {
      return null
    }

    pages[pageIndexNumber].disabled = true

    setWhatIsTheCurrentPage(pageNumber)
    await fetchTransactions(queryparams.query, queryparams.typeTransaction)
  }

  return (
    <MainDiv>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          {transactions.length < 1 && (
            <p>Nenhuma tranferencia foi encontrada</p>
          )}
          <tbody>
            {transactions.map((transaction) => {
              if (windowSize > 767) {
                return (
                  <tr key={transaction.id}>
                    <td>
                      <PriceHighlight
                        variant={
                          transaction.creditedAccountId === accountId
                            ? 'cashin'
                            : 'cashout'
                        }
                      >
                        {transaction.debitedAccountId === accountId && '-'}{' '}
                        {priceFormatter.format(transaction.value)}
                      </PriceHighlight>
                    </td>

                    <td>
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </td>
                  </tr>
                )
              } else {
                return (
                  <tr key={transaction.id}>
                    <td>
                      <PriceHighlight
                        variant={
                          transaction.creditedAccountId === accountId
                            ? 'cashin'
                            : 'cashout'
                        }
                      >
                        {transaction.debitedAccountId === accountId && '-'}{' '}
                        {priceFormatter.format(transaction.value)}
                      </PriceHighlight>
                    </td>

                    <td>
                      <div>
                        <CalendarBlank size={16} style={{ lineHeight: 0 }} />
                        {dateFormatter.format(new Date(transaction.createdAt))}
                      </div>
                    </td>
                  </tr>
                )
              }
            })}
          </tbody>
        </TransactionsTable>

        <PaginationContainer>
          {pages.map((page) => {
            return (
              <PaginationButton
                key={page.number}
                disabled={page.disabled}
                onClick={handlePaginationTransactions}
              >
                {page.number + 1}
              </PaginationButton>
            )
          })}
        </PaginationContainer>
      </TransactionsContainer>
    </MainDiv>
  )
}
