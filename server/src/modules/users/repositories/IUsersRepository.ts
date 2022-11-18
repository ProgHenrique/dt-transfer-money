export interface ICreateUserDTO {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  accountId: string;
}

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByUsername(username: string): Promise<User>
  findById(id: string): Promise<User>

}