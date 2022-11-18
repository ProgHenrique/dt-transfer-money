import { useEffect } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from './contexts/AuthContext'
import { CreateAccount } from './pages/CreateAccount'
import { Loading } from './pages/Loading'
import { Login } from './pages/Login'
import { Transactions } from './pages/Transactions'

export function Router() {
  const { verifyIfUserHasValidToken, userBalance } = useContextSelector(
    AuthContext,
    (context) => {
      return {
        verifyIfUserHasValidToken: context.verifyIfUserHasValidToken,
        userBalance: context.userBalance,
      }
    },
  )
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (verifyIfUserHasValidToken) {
      userBalance < 0 ? navigate('/login') : navigate('/home')
    }
  }, [location.pathname, navigate, userBalance, verifyIfUserHasValidToken])
  return (
    <Routes>
      <Route path="/">
        <Route
          path="/"
          element={userBalance < 0 ? <Navigate to="/login" /> : <Loading />}
        />
        <Route path="/home" element={<Transactions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAccount />} />
      </Route>
    </Routes>
  )
}
