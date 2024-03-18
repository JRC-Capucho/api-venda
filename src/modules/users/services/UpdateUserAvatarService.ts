import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import uploadConfig from "@config/upload";
import path from "path";
import fs from "fs";
import { IUpdateAvatarProfile } from "../domain/models/IUpdateAvatarProfile";


class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IUpdateAvatarProfile): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User not found.");

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarfileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarfileExist) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
