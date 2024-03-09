import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import { RedisCache } from "@shared/cache/RedisCache";

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const product = await productRepository.findOne(id);

    if (!product) throw new AppError("Product not found.");

    await productRepository.remove(product);

    await redisCache.invalidate("api-vendas-PRODUCT_LIST");
  }
}

export default DeleteProductService;
