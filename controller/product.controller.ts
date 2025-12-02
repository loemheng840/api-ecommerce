import { Request, Response } from "express";
import ProductService from "../service/product.service";

async function getProductById(req: Request, res: Response) {
  return ProductService.getProductById(req, res);
}

async function updateProduct(req: Request, res: Response) {
  return ProductService.updateProductById(req, res);
}

async function createProduct(req: Request, res: Response) {
  return ProductService.createProduct(req, res);
}

async function deleteProductById(req: Request, res: Response) {
  return ProductService.deleteProductById(req, res);
}

async function getAllProducts(_req: Request, res: Response) {
  return ProductService.getAllProducts(res);
}

export default {
  getProductById,
  updateProduct,
  createProduct,
  deleteProductById,
  getAllProducts,
};
