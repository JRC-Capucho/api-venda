import { IUser } from "./IUser";

export interface IResponseSession {
  user: IUser;
  token: string;
}
