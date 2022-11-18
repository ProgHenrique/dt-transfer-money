import { hash } from "bcrypt";
import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO, IUsersRepository } from "../../repositories/IUsersRepository";


export class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ username, password }: ICreateUserDTO): Promise<void> {
    const usernameAlreadyExists = await this.userRepository.findByUsername(username)

    if (usernameAlreadyExists) {
      throw new AppError("Username already in use!")
    }

    if (username.length < 3) {
      throw new AppError("Your username must be at least 3 characters!")
    }

    if (password.length < 8) {
      throw new AppError("Your password must be at least 8 characters!")
    }

    const validPassword = !!password.match(/[A-Z]/g) && !!password.match(/[0-9]/g) && !!password.match(/[a-z]/g)

    if (!validPassword) {
      throw new AppError("Your password must be at least one number and one capital letter!")
    }

    password.includes('.\d')

    const passwordHash = await hash(password, 10)

    const user = await this.userRepository.create({ username, password: passwordHash })
  }
}