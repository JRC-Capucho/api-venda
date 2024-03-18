import { IFindProducts } from "./IFindProducts";
import { IProduct } from "./IProduct";

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>
  findAllByIds(id: IFindProducts[]): Promise<IProduct[]>
}
