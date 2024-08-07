import Customer from "@modules/customers/infra/typeorm/entities/Customer";

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrdersProducts } from "./OrdersProducts";
import { IOrder } from "@modules/orders/domain/models/IOrder";

@Entity("orders")
export class Order implements IOrder {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
