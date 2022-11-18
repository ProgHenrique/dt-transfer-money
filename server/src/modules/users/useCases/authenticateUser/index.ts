import { UsersRepository } from "../../infra/prisma/repositories/UsersRepository"
import { AuthenticateUserController } from "./AuthenticateUserController"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


export const AuthenticateUserInicialize = () => {

  const userRepository = new UsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
  const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)

  return authenticateUserController
}