import { Request, Response } from "express";
import OrderServiceImpl from "./serviceImpl/order.service.impl";

export interface OrderService {
  createOrder: (req: Request, res: Response) => Promise<Response | void>;
  getOrderById: (req: Request, res: Response) => Promise<Response | void>;
  getAllOrders: (res: Response) => Promise<Response | void>;
  findOrderByUserId: (req: Request, res: Response) => Promise<Response | void>;
}

export default OrderServiceImpl;
