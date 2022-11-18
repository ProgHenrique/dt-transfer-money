import { CreateUserController } from './CreateUserController';
import { UsersRepository } from "../../infra/prisma/repositories/UsersRepository"
import { CreateUserUseCase } from './CreateUserUseCase';

export const CreateUserInicialize = () => {
  const userRepository = new UsersRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const createUserController = new CreateUserController(createUserUseCase)

  return createUserController
}