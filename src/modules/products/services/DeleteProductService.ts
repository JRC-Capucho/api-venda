import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import redisCache from "@shared/cache/RedisCache";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";


class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) throw new AppError("Product not found.");

    await productRepository.remove(product);

    await redisCache.invalidate("api-vendas-PRODUCT_LIST");
  }
}

export default DeleteProductService;
