import { ReactNode, useCallback, useEffect, useState } from 'react'
import { redirect } from 'react-router-dom'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface UserData {
  username: string
  password: string
}

interface AuthContextType {
  userToken: string
  username: string
  accountId: string
  userBalance: number
  verifyIfUserHasValidToken: boolean
  authenticateUser: ({ password, username }: UserData) => Promise<void>
  updateBalance: () => void
  createAccount: ({ password, username }: UserData) => Promise<void>
  logOut: () => void
}
interface Token {
  token: string
  user: {
    username: string
    accountId: string
  }
}

export const AuthContext = createContext({} as AuthContextType)
interface AuthProviderProps {
  children: ReactNode
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [userToken, setUserToken] = useState<Token>(() => {
    const storedStateAsJSON = localStorage.getItem('@tryout-money:token-1.0.0')

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return {
      token: '',
      user: {
        username: '',
        accountId: '',
      },
    }
  })
  const [userBalance, setUserBalance] = useState(-1)
  const [verifyIfUserHasValidToken, setVerifyIfUserHasValidToken] =
    useState(false)

  const getBalance = useCallback(async (token: string) => {
    try {
      const response = await api.get('user/balance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserBalance(response.data)
    } catch (error: any) {}
  }, [])

  const authenticateUser = useCallback(async (data: UserData) => {
    const { username, password } = data

    try {
      const response = await api.post('user/authenticate', {
        username,
        password,
      })
      setUserToken({
        token: response.data.token,
        user: response.data.user,
      })
    } catch (err: any) {
      alert('Nome de usuário ou senha incorretos')
    }
  }, [])

  useEffect(() => {
    const stateJSON = JSON.stringify(userToken)
    localStorage.setItem('@tryout-money:token-1.0.0', stateJSON)
    if (userToken.token) {
      getBalance(userToken.token)
      setVerifyIfUserHasValidToken(true)
    }
  }, [getBalance, userToken])

  const createAccount = useCallback(
    async (data: UserData) => {
      const { username, password } = data

      try {
        await api.post('user/create', {
          username,
          password,
        })
        await authenticateUser({ username, password })
      } catch (err: any) {
        switch (err.response.data.message) {
          case 'Username already in use!':
            alert('Ja existe um usuário com esse nome')
            break
          case 'Your password must be at least one number and one capital letter!':
            alert(
              'A senha deve conter pelo menos 8 dígitos um número e uma letra maiúscula',
            )
            break
          default:
        }
      }
    },
    [authenticateUser],
  )

  const logOut = useCallback(() => {
    localStorage.removeItem('@tryout-money:token-1.0.0')
    redirect('/login')
    setUserBalance(-1)
  }, [])

  function updateBalance() {
    getBalance(userToken.token)
  }

  return (
    <AuthContext.Provider
      value={{
        userToken: userToken.token,
        username: userToken.user.username,
        accountId: userToken.user.accountId,
        userBalance,
        verifyIfUserHasValidToken,
        authenticateUser,
        updateBalance,
        createAccount,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
