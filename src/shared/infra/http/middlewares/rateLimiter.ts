import { Response, Request, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";
import { Redis } from "ioredis";

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const redisClient = new Redis({
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
      host: process.env.REDIS_HOST,
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "ratelimit",
      points: 5,
      duration: 1,
    });
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError("Too many request.", 430);
  }
}
