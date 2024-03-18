import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import redisCache from '@shared/cache/RedisCache'


class CreateProductService {
  public async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const productExists = await productsRepository.findByName(name);
    if (productExists)
      throw new AppError("There is already one product with this name");

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);
    await redisCache.invalidate("api-vendas-PRODUCT_LIST");

    return product;
  }
}

export default CreateProductService;
