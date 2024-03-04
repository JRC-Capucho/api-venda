import { Request, Response } from "express";
import { ShowProfileService } from "../services/ShowProfileService";
import { UpdateProfileService } from "../services/UpdateProfileService";
import { instanceToInstance } from "class-transformer";

export class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileService = new ShowProfileService();

    const user = await showProfileService.execute({ user_id });

    return response.status(200).json(instanceToInstance(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfileService = new UpdateProfileService();

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.status(200).json(instanceToInstance(user));
  }
}
