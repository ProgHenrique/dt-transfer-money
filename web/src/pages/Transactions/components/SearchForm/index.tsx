import {
  ArrowCircleDown,
  ArrowCircleUp,
  ArrowClockwise,
  MagnifyingGlass,
} from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useWindowSize } from '../../../../hooks/useWindowSize'
import { useState } from 'react'
import {
  ResetFilter,
  SearchButton,
  SearchFormContainer,
  SearchFormDiv,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'

const searchFormSchema = z.object({
  query: z.string().optional(),
  type: z.enum(['cashin', 'cashout']).optional(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions, setCurrentQueryParams } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        fetchTransactions: context.fetchTransactions,
        setCurrentQueryParams: context.setCurrentQueryParams,
      }
    },
  )
  const [hasType, setHasType] = useState(false)

  const windowSize = useWindowSize()

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const hasDate = watch('query')

  const disabledButton = !hasDate === true && !hasType

  async function handleSearchTransactions(data: SearchFormInputs) {
    if (!data.query && !data.type) {
      return null
    }
    setCurrentQueryParams(data.query, data.type)
    await fetchTransactions(data.query, data.type)
    reset()
  }

  async function resetFilters() {
    setCurrentQueryParams('', '')
    await fetchTransactions()
    reset()
  }

  const newDate = new Date().toISOString().substring(0, 10)

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <SearchFormDiv variant={windowSize < 600}>
        <SearchButton type="submit" disabled={isSubmitting || disabledButton}>
          <MagnifyingGlass size={20} />
          {windowSize > 600 && 'Buscar'}
        </SearchButton>
        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            return (
              <TransactionType
                onValueChange={field.onChange}
                value={field.value === undefined ? '' : field.value}
                onClick={() =>
                  field.value === undefined
                    ? setHasType(false)
                    : setHasType(true)
                }
              >
                <TransactionTypeButton variant="cashin" value="cashin">
                  {windowSize > 600 && <ArrowCircleUp size={20} />}
                  Recebidos
                </TransactionTypeButton>

                <TransactionTypeButton variant="cashout" value="cashout">
                  {windowSize > 600 && <ArrowCircleDown size={20} />}
                  Enviados
                </TransactionTypeButton>
              </TransactionType>
            )
          }}
        />
        <input
          type="date"
          placeholder="Busque por transações"
          {...register('query')}
          max={newDate}
        />
      </SearchFormDiv>
      {windowSize > 600 && (
        <ResetFilter onClick={resetFilters} resetVisible={disabledButton}>
          <ArrowClockwise size={20} />
          {windowSize > 600 && 'Resetar'}
        </ResetFilter>
      )}
    </SearchFormContainer>
  )
}
