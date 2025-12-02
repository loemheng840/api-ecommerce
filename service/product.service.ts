import { Request, Response } from "express";
import ProductServiceImpl from "./serviceImpl/product.service.impl";

export interface ProductService {
  createProduct: (req: Request, res: Response) => Promise<Response>;
  getProductById: (req: Request, res: Response) => Promise<Response>;
  getAllProducts: (res: Response) => Promise<Response | void>;
  updateProductById: (req: Request, res: Response) => Promise<Response>;
  deleteProductById: (req: Request, res: Response) => Promise<Response>;
}

export default ProductServiceImpl;
