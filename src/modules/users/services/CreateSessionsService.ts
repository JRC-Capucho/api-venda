import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { ICreateSession } from "../domain/models/ICreateSession";
import { IResponseSession } from "../domain/models/IResponseSession";
import authConfig from "@config/auth";


class CreateSessionService {
  public async execute({ email, password }: ICreateSession): Promise<IResponseSession> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError("Incorrect email/password combination.", 401);

    const matched = await compare(password, user.password);

    if (!matched)
      throw new AppError("Incorrect email/password combination.", 401);

    const token = sign({}, authConfig.jwt.secret as string, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
