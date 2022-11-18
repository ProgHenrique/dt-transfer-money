import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    username: string;
    accountId: string;
  }
}

export class AuthenticateUserUseCase {

  constructor(private userRepository: IUsersRepository) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {

    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new AppError("Username or password incorrect");
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Username or password incorrect");
    }

    const token = sign({ username }, `${process.env.SECRET_TOKEN}`, {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        username: user.username,
        accountId: user.accountId
      }
    }

    return tokenReturn
  }
}