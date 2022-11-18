/* eslint-disable prettier/prettier */
import styled, { css, keyframes } from 'styled-components'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  overflow: hidden;
`

export const AmountTransactionsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;

  span:first-child {
    font-size: 1.125rem;
    line-height: 160%;
    color: ${(props) => props.theme['gray-300']};
  }

  span:last-child {
    font-size: 1rem;
    line-height: 160%;
    color: ${(props) => props.theme['gray-500']};
  }
`

interface SearchFormDivProps {
  variant: boolean
}

export const SearchFormDiv = styled.div<SearchFormDivProps>`
  display: flex;
  gap: 0.5rem;
  width: ${props => props.variant ? '100%' : '70%'};

  button {
    box-shadow: none;
  }

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;
    &:focus{
      outline: 1px solid ${(props) => props.theme['green-500']};
      outline-offset: -1px;
      box-shadow: none;
    }

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }

  }
`

export const SearchButton = styled.button`
  display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['green-300']};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-500']};
      border-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }

`

export const TransactionType = styled(RadioGroup.Root)`
  display: flex;
  /* grid-template-columns: repeat(2, 1fr); */
  gap: 1rem;
`

interface TransactionTypeButtonProps {
  variant: 'cashin' | 'cashout'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item
) <TransactionTypeButtonProps>`
  background: ${(props) => props.theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme['gray-300']};

  svg {
    color: ${(props) =>
    props.variant === 'cashin'
      ? props.theme['green-300']
      : props.theme['red-300']};
  }

  &[data-state='unchecked']:hover {
    background: ${(props) => props.theme['gray-600']};
    transition: background-color 0.2s;
  }

  &[data-state='checked'] {
    color: ${(props) => props.theme.white};
    background: ${(props) =>
    props.variant === 'cashin'
      ? props.theme['green-300']
      : props.theme['red-300']};

    svg {
      color: ${(props) => props.theme.white};
    }
  }
`

const visibleResetButton = keyframes`
  from {
    transform: translateX(110%);
    opacity: 0;
  }

  to {
    transform: translateX(0%);
    opacity: 1;
  }
`

interface ResetFilterProps {
  resetVisible: boolean;
}
export const ResetFilter = styled.button<ResetFilterProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  border: 0;
  padding: 1rem;
  background: transparent;
  border: 1px solid ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme['green-300']};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  
  ${props => props.resetVisible === false ? css`
    animation-name: ${visibleResetButton};
    animation-duration: 0.2s;
    animation-iteration-count: forwards;
  `: css`
    transform: translateX(110%);
    opacity: 0;
    transition: all 0.2s ease-in-out;
  `}

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-500']};
    border-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }
`
