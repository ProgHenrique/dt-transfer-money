import styled, { keyframes } from 'styled-components'

const Spinner = keyframes`
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(360deg);
  }
`

export const ImageDiv = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  img {
    transform: translate(-50%, -50%);

    animation: ${Spinner} 2s infinite;
  }
`
