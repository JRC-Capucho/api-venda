import SendForgotPasswordEmailService from "@modules/users/services/SendForgotPasswordEmailService";
import { Request, Response } from "express";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotPassword = new SendForgotPasswordEmailService()

    await sendForgotPassword.execute(email)

    return response.status(204).json();
  }
}
