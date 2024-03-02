import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";
import CustomersRepository from "../typeorm/repositories/CustomerRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) throw new AppError("Customer not found.");

    const customerUpdateEmail = await customersRepository.findByName(email);

    if (customerUpdateEmail && customerUpdateEmail.id !== id)
      throw new AppError("There is already one customer with this email.");

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}