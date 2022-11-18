import { Request, Response } from "express";
import { AllUserTransactionsUseCase } from "./AllUserTransactionsUseCase";



export class AllUserTransactionsController {

  constructor(private allUserTransactionsUseCase: AllUserTransactionsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { date, type, skip } = request.query;

    const transactions = await this.allUserTransactionsUseCase.execute({
      id,
      date: date?.toString(),
      type: type?.toString(),
      skip: skip?.toString()
    })
    return response.json(transactions)
  }
}