import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    console.log(" before find by email");
    const emailExists = await usersRepository.findByEmail(email);
    console.log(" after find by email");

    if (emailExists) throw new AppError("Email address already used.");

    console.log("before create");

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    console.log("after create");

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
