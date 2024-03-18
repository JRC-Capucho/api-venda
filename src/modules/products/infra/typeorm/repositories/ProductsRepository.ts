import { EntityRepository, In, Repository } from "typeorm";
import Product from "../entities/Product";
import { IProductsRepository } from "@modules/products/domain/models/IProductsRepository";
import { IFindProducts } from "@modules/products/domain/models/IFindProducts";


@EntityRepository(Product)
export class ProductRepository extends Repository<Product> implements IProductsRepository {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsId = products.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productsId),
      },
    });

    return existsProducts;
  }
}
