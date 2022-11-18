import {
  HeaderContainer,
  HeaderContent,
  ListButton,
  NewTransitionButton,
} from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { useWindowSize } from '../../hooks/useWindowSize'
import { List } from 'phosphor-react'
import { HamburguerMenu } from '../HamburguerMenu.ts'

export function Header() {
  const windowSize = useWindowSize()
  return (
    <HeaderContainer>
      <HeaderContent>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ListButton>
              <List size={30} weight="bold" />
            </ListButton>
          </Dialog.Trigger>

          <HamburguerMenu />
        </Dialog.Root>

        {windowSize > 767 && <img src={logoImg} alt="" height={41} />}

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransitionButton>Nova Transação</NewTransitionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
