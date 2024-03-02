import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordsRouter = Router();
const passwordController = new ForgotPasswordController();
const resetController = new ResetPasswordController();

passwordsRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  passwordController.create,
);

passwordsRouter.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref("password")),
    },
  }),
  resetController.create,
);

export default passwordsRouter;
