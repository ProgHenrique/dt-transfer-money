import styled from 'styled-components'

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
`

export const ImageLogin = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5rem;
  padding: 3rem 6rem;
  width: 100%;
  height: 100vh;
`

export const FormLogin = styled.section`
  width: 100%;
  display: flex;
  gap: 2.5rem;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    gap: 5rem;

    fieldset {
      all: unset;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
`

export const InvitingText = styled.div`
  h1 {
    color: white;
    font-size: 2.25rem;
    font-weight: bolder;
  }
`

export const LoginInput = styled.input`
  all: unset;
  width: 100%;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${(props) => props.theme['gray-300']};
  &:focus {
    box-shadow: none;
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-100']};
  }
`

export const LoginButton = styled.button`
  padding: 1rem 2.25rem;
  width: 100%;
  background: ${(props) => props.theme['green-500']};
  color: white;
  font-weight: bold;
  border: 2px solid white;
  cursor: pointer;
  border-radius: 6px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-300']};
    transition: background-color 0.2s ease-in-out;
  }
`

export const CreateAccount = styled.p`
  display: flex;
  justify-content: center;
  a {
    color: ${(props) => props.theme['green-500']};
    text-decoration: none;
    border-bottom: 1px solid ${(props) => props.theme['green-500']};
    box-shadow: none;

    &:active {
      color: ${(props) => props.theme['green-500']};
    }

    &:hover {
      color: ${(props) => props.theme['green-300']};
      transition: color 0.2s ease-in-out;
    }
  }
`
