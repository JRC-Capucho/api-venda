import { IUser } from "./IUser"

export interface IUsersRepository {
  findByName(name: string): Promise<IUser | undefined>
  findById(id: string): Promise<IUser | undefined>
  findByEmail(email: string): Promise<IUser | undefined>
}
