import { ICustomer } from "@modules/customers/domain/models/ICustomer"
import { IOrder } from "../models/IOrder"
import { IOrderProduct } from "../models/IOrderProduct";

interface IRequest {
  customer: ICustomer;
  products: IOrderProduct[];
}

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>
  createOrder({ customer, products }: IRequest): Promise<IOrder>
}

