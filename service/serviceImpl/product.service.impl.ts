import { Request, Response } from "express";
import { ProductService } from "../product.service";
import productRepository from "../../repository/repositoryImpl/product.repository.impl";

class ProductServiceImpl implements ProductService {
  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      // Check if product name already exists
      const existingProduct = await productRepository.findByName(req.body.name);
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          error: "Product already exists",
        });
      }

      const product = await productRepository.save(req.body);

      return res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error: unknown) {
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }
  
  async getAllProducts(res: Response): Promise<Response | void> {
    try {
      const products = await productRepository.findAll();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const product = await productRepository.findById(req.params.id as string);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, error: "Product not found" });
      }
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error: unknown) {
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }

  async deleteProductById(req: Request, res: Response): Promise<Response> {
    try {
      const productId = await productRepository.deleteById(
        req.params.id as string
      );

      if (!productId) {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error: unknown) {
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }

  async updateProductById(req: Request, res: Response): Promise<Response> {
    try {
      // Check if product exists
      const product = await productRepository.findById(req.params.id as string);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }

      await product.save();
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error: unknown) {
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }
}

export default new ProductServiceImpl();
