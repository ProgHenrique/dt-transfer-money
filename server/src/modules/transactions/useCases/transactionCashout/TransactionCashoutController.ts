import { Request, Response } from "express";
import { TransactionCashoutUseCase } from "./TransactionCashoutUseCase";


export class TransactionCashoutController {

  constructor(private transactionCashoutUseCase: TransactionCashoutUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { value, username } = request.body;

    const proof = await this.transactionCashoutUseCase.execute({
      id,
      usernameToCashin: username,
      valueStatement: value
    })

    return response.status(201).json(proof)
  }
}