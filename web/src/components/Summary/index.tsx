import { useSummary } from '../../hooks/useSummary'
import { useContextSelector } from 'use-context-selector'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { priceFormatter } from '../../utils/formatter'

import { SummaryCard, SummaryContainer, SwiperContainer } from './styles'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { AuthContext } from '../../contexts/AuthContext'

export function Summary() {
  const { userBalance } = useContextSelector(AuthContext, (context) => {
    return {
      userBalance: context.userBalance,
    }
  })

  function hiddenOrShowBalance(event: any) {
    event.target.classList.toggle('hidden')
  }

  const windowSize = useWindowSize()
  const summary = useSummary()

  const iconSize = windowSize < 301 ? 24 : 32

  return windowSize <= 767 ? (
    <SwiperContainer slidesPerView={2} spaceBetween={20} centeredSlides={true}>
      <SummaryContainer>
        <SwiperSlide className="swiper_slide">
          <SummaryCard>
            <header>
              <span>Recebidos</span>
              <span id="income">
                <ArrowCircleUp size={iconSize} color="#00b37e" />
              </span>
            </header>

            <strong className="hidden" onClick={hiddenOrShowBalance}>
              {priceFormatter.format(summary.cashin)}
            </strong>
          </SummaryCard>
        </SwiperSlide>

        <SwiperSlide>
          <SummaryCard>
            <header>
              <span>Enviados</span>
              <span id="outcome">
                <ArrowCircleDown size={iconSize} color="#f75a68" />
              </span>
            </header>

            <strong className="hidden" onClick={hiddenOrShowBalance}>
              {priceFormatter.format(summary.cashout)}
            </strong>
          </SummaryCard>
        </SwiperSlide>

        <SwiperSlide>
          <SummaryCard variant="green">
            <header>
              <span>Saldo</span>
              <span>
                <CurrencyDollar size={iconSize} color="#fff" />
              </span>
            </header>

            <strong className="hidden" onClick={hiddenOrShowBalance}>
              {priceFormatter.format(userBalance)}
            </strong>
          </SummaryCard>
        </SwiperSlide>
      </SummaryContainer>
    </SwiperContainer>
  ) : (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Recebidos</span>
          <span id="income">
            <ArrowCircleUp size={32} color="#00b37e" />
          </span>
        </header>

        <strong className="hidden" onClick={hiddenOrShowBalance}>
          {priceFormatter.format(summary.cashin)}
        </strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Enviados</span>
          <span id="outcome">
            <ArrowCircleDown size={32} color="#f75a68" />
          </span>
        </header>

        <strong className="hidden" onClick={hiddenOrShowBalance}>
          {priceFormatter.format(summary.cashout)}
        </strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Saldo</span>
          <span>
            <CurrencyDollar size={32} color="#fff" />
          </span>
        </header>

        <strong className="hidden" onClick={hiddenOrShowBalance}>
          {priceFormatter.format(userBalance)}
        </strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
