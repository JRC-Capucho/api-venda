import "express-async-errors";
import "dotenv/config";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";
import { errors } from "celebrate";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { pagination } from "typeorm-pagination";
import routes from "./routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(pagination);
app.use(routes);

app.use(errors());

// MIDDLEWARE FOR ERRORS
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError)
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

app.listen(3333, () => {
  console.log("Server started on port 3333 🚀");
});
