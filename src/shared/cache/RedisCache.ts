import cacheConfig from "@config/cache";
import Redis, { RedisClient } from "ioredis";

export class RedisCache {
  private client: RedisClient;
  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) return null;

    return JSON.parse(data) as T;
  }

  async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
