import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import CustomersController from "../controllers/CustomerController";

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated);

customersRouter.get("/", customersController.index);

customersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  customersController.show,
);

customersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email(),
    },
  }),
  customersController.create,
);

customersRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email(),
    },
  }),
  customersController.update,
);

customersRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  customersController.delete,
);

export default customersRouter;
