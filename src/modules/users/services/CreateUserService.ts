import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import { hash } from "bcryptjs";
import { ICreateUser } from "../domain/models/ICreateUser";


class CreateUserService {
  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) throw new AppError("Email address already used.");

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
