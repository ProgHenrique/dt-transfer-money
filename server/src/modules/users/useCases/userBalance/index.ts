import { AccountsRepository } from '../../infra/prisma/repositories/AccountsRepository';
import { UsersRepository } from '../../infra/prisma/repositories/UsersRepository';
import { UserBalanceController } from './UserBalanceController';
import { UserBalanceUseCase } from './UserBalanceUseCase';


export const UserBalanceInicialize = () => {
  const userRepository = new UsersRepository()
  const accountsRepository = new AccountsRepository()
  const userBalanceUseCase = new UserBalanceUseCase(userRepository, accountsRepository)
  const userBalanceController = new UserBalanceController(userBalanceUseCase)

  return userBalanceController
}