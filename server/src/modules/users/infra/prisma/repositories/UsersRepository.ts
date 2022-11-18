import { prisma } from "../../../../../database/prismaclient";
import { ICreateUserDTO, IUsersRepository, User } from "../../../repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {

  async create({ username, password }: ICreateUserDTO): Promise<User> {
    const user = await prisma.users.create({
      data: {
        password,
        username,
        account: {
          create: {
            balance: 100
          }
        }
      }
    })

    return user
  }

  async findByUsername(username: string): Promise<User> {
    const user = await prisma.users.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username
        }
      }
    })

    return user!
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.users.findUnique({
      where: {
        id
      }
    })

    return user!
  }

}