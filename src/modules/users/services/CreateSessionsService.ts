import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import User from "../typeorm/entities/User";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequestl): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError("Incorrect email/password combination.", 401);

    const matched = await compare(password, user.password);

    if (!matched)
      throw new AppError("Incorrect email/password combination.", 401);

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;