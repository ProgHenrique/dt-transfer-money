import loadingSpinner from '../../assets/loadingSpinner.svg'
import { ImageDiv } from './styles'
export function Loading() {
  return (
    <ImageDiv>
      <img src={loadingSpinner} alt="" width={70} />
    </ImageDiv>
  )
}
