import { ICreateCustomer } from "../models/ICreateCustomer"
import { ICustomer } from "../models/ICustomer"

export interface ICustomerRepository {
  findByName(name: string): Promise<ICustomer | undefined>
  findById(id: string): Promise<ICustomer | undefined>
  findByEmail(email: string): Promise<ICustomer | undefined>
  // save(customer: ICustomer): Promise<void>
  // create(data: ICreateCustomer): Promise<ICustomer>
}
