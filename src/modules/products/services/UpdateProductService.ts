import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
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
