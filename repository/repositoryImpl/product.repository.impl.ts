import productDomain, { IProduct } from "../../model/product.domain";
import { ProductCreateDto, ProductUpdateDto } from "../../types/product.types";
import { ProductRepository } from "../product.repository";

class ProductRepositoryImpl implements ProductRepository {
  async save(productData: ProductCreateDto): Promise<IProduct> {
    const product = new productDomain(productData);
    return await product.save();
  }

  async findById(productId: string): Promise<IProduct | null> {
    return await productDomain.findById(productId);
  }

  async findByName(name: string): Promise<IProduct | null> {
    return await productDomain.findOne({ name });
  }

  async findAll(): Promise<IProduct[]> {
    return await productDomain.find();
  }

  async deleteById(productId: string): Promise<IProduct | null> {
    return await productDomain.findByIdAndDelete(productId);
  }

  async updateById({
    productId,
    updateData,
  }: {
    productId: string;
    updateData: ProductUpdateDto;
  }): Promise<IProduct | null> {
    return await productDomain.findByIdAndUpdate(productId, updateData, {
      new: true,
    });
  }
}

export default new ProductRepositoryImpl();
