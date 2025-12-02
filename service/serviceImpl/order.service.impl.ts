import { Request, Response } from "express";
import { OrderService } from "../order.service";
import orderRepository from "../../repository/repositoryImpl/order.repository.impl";
import productRepository from "../../repository/repositoryImpl/product.repository.impl";
import mongoose from "mongoose";

class OrderServiceImpl implements OrderService {
  async createOrder(req: Request, res: Response): Promise<Response | void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: "User authentication required",
        });
      }

      const { products } = req.body;

      // Calculate total amount by fetching product prices
      let totalAmount = 0;
      const productDetails = [];

      for (const item of products) {
        const product = await productRepository.findById(item.productId);
        
        if (!product) {
          return res.status(404).json({
            success: false,
            error: `Product with ID ${item.productId} not found`,
          });
        }

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        productDetails.push({
          productId: product._id,
          quantity: item.quantity,
        });
      }

      // Create order with calculated total
      const order = await orderRepository.save({
        userId: new mongoose.Types.ObjectId(userId),
        products: productDetails,
        totalAmount,
      });

      return res.status(201).json({
        success: true,
        data: order,
        message: "Order created successfully",
      });
    } catch (error: unknown) {
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<Response | void> {
    try {
      const order = await orderRepository.findById(req.params.id as string);

      if (!order) {
        return res.status(404).json({
          success: false,
          error: "Order not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error: unknown) {
      console.error("Error fetching order:", error);
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }

  async getAllOrders(res: Response): Promise<Response | void> {
    try {
      const orders = await orderRepository.findAll();

      return res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error: unknown) {
      console.error("Error fetching orders:", error);
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }

  async findOrderByUserId(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      const userId = req.params.userId || req.user?.id;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: "User ID is required",
        });
      }

      const orders = await orderRepository.findByUserId(userId);

      return res.status(200).json({
        success: true,
        data: orders,
        count: orders.length,
      });
    } catch (error: unknown) {
      console.error("Error fetching user orders:", error);
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }
}

export default new OrderServiceImpl();
