import { getCustomRepository } from "typeorm";
import Customer from "../infra/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";
import CustomersRepository from "../infra/typeorm/repositories/CustomerRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) throw new AppError("Email address already used.");

    const customer = customersRepository.create({
      name: name,
      email: email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
