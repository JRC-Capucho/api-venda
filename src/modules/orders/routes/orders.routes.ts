import { Router } from "express";
import { OrdersController } from "../controllers/OrdersCrontroller";
import { Joi, Segments, celebrate } from "celebrate";
import isAuthenticated from "@modules/users/middlewares/isAuthenticated";

const ordersRouters = Router();

const ordersController = new OrdersController();

ordersRouters.use(isAuthenticated);

ordersRouters.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRouters.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRouters;
