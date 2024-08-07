import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserTokensRepository from "../infra/typeorm/repositories/UserTokensRepository";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";
import { IResetPassword } from "../domain/models/IResetPassword";


class ResetPasswordService {
  public async execute({ token, password }: IResetPassword): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) throw new AppError("User token does not exists.", 404);

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError("User does not exists.", 404);

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError("Token expired.");

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
