import { Request, Response } from "express";
import { TransactionsFilterUseCase } from "./TransactionsFilterUseCase";


export class TransactionsFilterController {

  constructor(private transactionsFilterUseCase: TransactionsFilterUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    //type query needs to be 'cashin' | 'cashout'
    const { date, type, skip } = request.query;

    const transactions = await this.transactionsFilterUseCase.execute({
      id,
      date: date?.toString(),
      type: type?.toString(),
      skip: skip?.toString()
    })

    return response.json(transactions)
  }
}