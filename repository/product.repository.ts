import { IProduct } from "../model/product.domain";
import { ProductCreateDto, ProductUpdateDto } from "../types/product.types";

export interface ProductRepository {
  save: (productData: ProductCreateDto) => Promise<IProduct>;
  findById: (productId: string) => Promise<IProduct | null>;
  findByName: (name: string) => Promise<IProduct | null>;
  findAll: () => Promise<IProduct[]>;
  deleteById: (productId: string) => Promise<IProduct | null>;
  updateById: (params: {
    productId: string;
    updateData: ProductUpdateDto;
  }) => Promise<IProduct | null>;
}
