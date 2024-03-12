import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import helloelleleploadConfigploadConfiploadConfploadCoploadCploadploaploplppppppdpdapdatpdapdp from "@config/upload";
import path from "path";
import fs from "fs";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User not found.");

    if (user.avatar) {
      const userAvatarFilePath = path.join(helloelleleploadConfigploadConfiploadConfploadCoploadCploadploaploplppppppdpdapdatpdapdp.directory, user.avatar);
      const userAvatarfileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarfileExist) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
