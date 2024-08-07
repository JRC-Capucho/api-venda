import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import CustomersRepository from "../infra/typeorm/repositories/CustomerRepository";
import Customer from "../infra/typeorm/entities/Customer";

interface IRequest {
  id: string;
}

export default class ShowCustomerService {
  async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) throw new AppError("Customer not found.");

    return customer;
  }
}
