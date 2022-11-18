import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const NewTransitionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: none;

  &:hover {
    background: ${(props) => props.theme['green-700']};
    transition: background-color 0.2s;
  }

  @media (max-width: 500px) {
    height: 38px;
  }

  @media (max-width: 300px) {
    height: 26px;
  }
`

export const ListButton = styled.button`
  border-radius: 6px;
  color: ${(props) => props.theme['green-300']};
  cursor: pointer;
  background: none;
  border: none;
  box-shadow: none;

  &:hover {
    color: ${(props) => props.theme['green-500']};
    transition: background-color 0.2s;
  }
  @media (max-width: 500px) {
    height: 38px;
  }

  @media (max-width: 300px) {
    height: 26px;
  }
`
