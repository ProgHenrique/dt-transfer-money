import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 2;
`
export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  height: 100vh;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};
  box-shadow: none;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
  box-shadow: none;
`

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 4rem;
  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: ${(props) => props.theme['green-500']};
  }

  p {
    font-size: 1.25rem;
    text-transform: uppercase;
  }
`

export const LogoutButton = styled.button`
  width: 60%;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 1rem 1.25rem;
  border-radius: 6px;
  margin-top: 1.5rem;
  cursor: pointer;
  box-shadow: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
    transition: background-color 0.2s;
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
