import { Router } from "express";
import productsRouter from "@modules/products/routes/products.routes";
import sessionRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import passwordsRouter from "@modules/users/routes/passwords.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import customersRouter from "@modules/customers/routes/customers.routes";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);
routes.use("/passwords", passwordsRouter);
routes.use("/profiles", profileRouter);
routes.use("/customers", customersRouter);

export default routes;
