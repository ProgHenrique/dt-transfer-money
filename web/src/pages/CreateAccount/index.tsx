import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  InvitingText,
  MainContent,
  LoginLink,
  CreateAccountContainer,
  FormCreateAccount,
  CreateAccountInput,
  CreateAccountButton,
  ImageLogin,
} from './styles'
import logoImg from '../../assets/logo.svg'
import createImg from '../../assets/createImg.svg'
import { AuthContext } from '../../contexts/AuthContext'
import { useContextSelector } from 'use-context-selector'
import { useWindowSize } from '../../hooks/useWindowSize'

const createAccountFormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
})

type CreateAccountFormInputs = z.infer<typeof createAccountFormSchema>
export function CreateAccount() {
  const createAccount = useContextSelector(AuthContext, (context) => {
    return context.createAccount
  })
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<CreateAccountFormInputs>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const windowSize = useWindowSize()

  const formFieldsUsername = watch('username')
  const formFieldsPassword = watch('password')

  const isSubmitDisabled = !formFieldsPassword || !formFieldsUsername

  async function userCreateAccount(data: CreateAccountFormInputs) {
    await createAccount(data)
    reset()
  }
  return (
    <CreateAccountContainer>
      {windowSize > 767 && (
        <ImageLogin>
          <img src={createImg} alt="" width={560} />
        </ImageLogin>
      )}

      <MainContent>
        <img src={logoImg} alt="" height={41} />
        <FormCreateAccount>
          <InvitingText>
            <h1>Crie sua conta</h1>
            <p>e comece a usar totalmente grátis</p>
          </InvitingText>

          <form onSubmit={handleSubmit(userCreateAccount)}>
            <fieldset>
              <CreateAccountInput
                type="text"
                placeholder="Username"
                {...register('username')}
              />
              <CreateAccountInput
                type="password"
                placeholder="Senha"
                {...register('password')}
              />
            </fieldset>

            <CreateAccountButton
              type="submit"
              disabled={isSubmitting || isSubmitDisabled}
            >
              Criar conta
            </CreateAccountButton>
          </form>
          <LoginLink>
            Já possui uma conta?&nbsp; <a href="/login">Entrar</a>
          </LoginLink>
        </FormCreateAccount>
      </MainContent>
    </CreateAccountContainer>
  )
}
