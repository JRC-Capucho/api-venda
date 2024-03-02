import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "../middlewares/isAuthenticated";
import { ShowProfileService } from "../services/ShowProfileService";
import { UpdateProfileService } from "../services/UpdateProfileService";
import { ProfileController } from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get("/", profileController.show);

profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref("password"))
        .when("password", {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      old_password: Joi.string(),
    },
  }),
  profileController.update,
);

export default profileRouter;
