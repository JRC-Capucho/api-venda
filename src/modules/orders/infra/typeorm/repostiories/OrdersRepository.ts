import { EntityRepository, Repository } from "typeorm";
import { Order } from "../entities/Order";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { IOrderProduct } from "@modules/orders/domain/models/IOrderProduct";

interface IRequest {
  customer: ICustomer
  products: IOrderProduct[]
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> implements IOrdersRepository {
  async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne(id, {
      relations: ["order_products", "customer"],
    });

    return order;
  }

  async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}
