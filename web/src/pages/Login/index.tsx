import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  CreateAccount,
  FormLogin,
  ImageLogin,
  InvitingText,
  LoginButton,
  LoginContainer,
  LoginInput,
  MainContent,
} from './styles'
import logoImg from '../../assets/logo.svg'
import loginImg from '../../assets/loginImage.svg'
import { AuthContext } from '../../contexts/AuthContext'
import { useContextSelector } from 'use-context-selector'
import { useWindowSize } from '../../hooks/useWindowSize'

const loginFormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>
export function Login() {
  const { authenticateUser } = useContextSelector(AuthContext, (context) => {
    return {
      authenticateUser: context.authenticateUser,
    }
  })

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const windowSize = useWindowSize()

  const formFieldsUsername = watch('username')
  const formFieldsPassword = watch('password')

  const isSubmitDisabled = !formFieldsPassword || !formFieldsUsername

  async function userLogin(data: LoginFormInputs) {
    await authenticateUser(data)
    reset()
  }
  return (
    <LoginContainer>
      {windowSize > 767 && (
        <ImageLogin>
          <img src={loginImg} alt="" width={560} />
        </ImageLogin>
      )}

      <MainContent>
        <img src={logoImg} alt="" height={41} />
        <FormLogin>
          <InvitingText>
            <h1>Insira seus dados</h1>
            <p>e continue usando o DT Money</p>
          </InvitingText>

          <form onSubmit={handleSubmit(userLogin)}>
            <fieldset>
              <LoginInput
                type="text"
                placeholder="Username"
                {...register('username')}
              />
              <LoginInput
                type="password"
                placeholder="Senha"
                {...register('password')}
              />
            </fieldset>

            <LoginButton
              type="submit"
              disabled={isSubmitting || isSubmitDisabled}
            >
              Entrar
            </LoginButton>
          </form>
          <CreateAccount>
            Ainda não possui uma conta?&nbsp; <a href="/create">Criar conta</a>
          </CreateAccount>
        </FormLogin>
      </MainContent>
    </LoginContainer>
  )
}
