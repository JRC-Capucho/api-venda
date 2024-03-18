import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import { IUpdateProduct } from "../domain/models/IUpdateProduct";
import redisCache from "@shared/cache/RedisCache";


class UpdateProductService {
  async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) throw new AppError("Product not found.");

    const productExist = await productRepository.findByName(name);

    if (productExist && name !== product.name)
      throw new AppError("There is already one product with this name.");

    await redisCache.invalidate("api-vendas-PRODUCT_LIST");

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
