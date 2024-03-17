import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { RedisCache } from "@shared/cache/RedisCache";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) throw new AppError("Product not found.");

    await productRepository.remove(product);

    await redisCache.invalidate("api-vendas-PRODUCT_LIST");
  }
}

export default DeleteProductService;
