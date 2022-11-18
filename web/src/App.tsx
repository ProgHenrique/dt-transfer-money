import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './contexts/AuthContext'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { GlobalStyle } from './global'
import { Router } from './Router'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <AuthProvider>
          <TransactionsProvider>
            <Router />
          </TransactionsProvider>
        </AuthProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
