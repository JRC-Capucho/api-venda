import { Router } from "express";
import UsersController from "../controllers/UsersController";
import multer from "multer";
import { celebrate, Joi, Segments } from "celebrate";
import uploadConfig from "@config/upload";
import UserAvatarController from "../controllers/UserAvatarController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer);

usersRouter.get("/", isAuthenticated, usersController.index);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  usersAvatarController.update,
);

export default usersRouter;
