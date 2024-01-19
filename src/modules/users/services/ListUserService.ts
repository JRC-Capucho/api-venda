import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRository = getCustomRepository(UsersRepository);

    const users = usersRository.find();

    return users;
  }
}

export default ListUserService;
