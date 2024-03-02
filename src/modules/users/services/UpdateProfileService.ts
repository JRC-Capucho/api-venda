import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export class UpdateProfileService {
  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User not found.");

    const userUpdateEmail = await usersRepository.findByName(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id)
      throw new AppError("There is already one user with this email.");

    if (password && !old_password)
      throw new AppError("Old password is required.");

    if (password && old_password) {
      const matchOldPassword = compare(old_password, user.password);

      if (!matchOldPassword)
        throw new AppError("Old password doesn't not match.");

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}
