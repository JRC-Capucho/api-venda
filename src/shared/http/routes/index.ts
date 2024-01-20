import { Router } from "express";
import productsRouter from "@modules/products/routes/products.routes";
import sessionRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);

export default routes;
