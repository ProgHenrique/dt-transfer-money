import * as Dialog from '@radix-ui/react-dialog'
import { User, X } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '../../contexts/AuthContext'
import {
  CloseButton,
  Content,
  LogoutButton,
  Overlay,
  UserInfoContainer,
} from './style'

export function HamburguerMenu() {
  const { logOut, username } = useContextSelector(AuthContext, (context) => {
    return { logOut: context.logOut, username: context.username }
  })
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>A carteira digital da nova geração</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <UserInfoContainer>
          <div>
            <User size={20} weight="bold" /> <strong>Username</strong>
          </div>
          <p>{username}</p>
        </UserInfoContainer>
        <LogoutButton onClick={() => logOut()}>Sair</LogoutButton>
      </Content>
    </Dialog.Portal>
  )
}
