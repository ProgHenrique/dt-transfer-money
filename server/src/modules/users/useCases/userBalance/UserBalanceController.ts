import { Request, Response } from 'express';
import { UserBalanceUseCase } from './UserBalanceUseCase';
export class UserBalanceController {

  constructor(private userBalanceUseCase: UserBalanceUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userBalance = await this.userBalanceUseCase.execute(id)

    return response.status(200).json(userBalance)
  }
}