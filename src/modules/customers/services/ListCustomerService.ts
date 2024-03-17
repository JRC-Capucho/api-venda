import { getCustomRepository } from "typeorm";
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../infra/typeorm/repositories/CustomerRepository";

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customers = customersRepository
      .createQueryBuilder()
      .skip(0)
      .take(10)
      .getMany();
    return customers;
  }
}

export default ListCustomerService;
