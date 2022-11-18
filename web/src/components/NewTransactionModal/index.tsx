import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X } from 'phosphor-react'
import { CloseButton, Content, HiddenBalance, Overlay } from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '../../contexts/AuthContext'
import { priceFormatter } from '../../utils/formatter'
import { useState } from 'react'

const newTransactionFormSchema = z.object({
  username: z.string(),
  value: z.number(),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const userBalance = useContextSelector(AuthContext, (context) => {
    return context.userBalance
  })
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const [isHidden, setIsHidden] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transferência</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <div>
            <strong>Saldo em conta</strong>
            <HiddenBalance
              variant={isHidden}
              onClick={() => setIsHidden(!isHidden)}
            >
              {priceFormatter.format(userBalance)}
            </HiddenBalance>
          </div>

          <input
            type="text"
            placeholder="Username do usuário"
            {...register('username')}
            required
          />
          <input
            type="number"
            placeholder="Valor da transferência"
            {...register('value', { valueAsNumber: true })}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
