import { IOrder } from "../model/order.domain";

export interface OrderRepository {
  save: (orderData: Partial<IOrder>) => Promise<IOrder>;
  findById: (orderId: string) => Promise<IOrder | null>;
  findByUserId: (userId: string) => Promise<IOrder[]>;
  findAll: () => Promise<IOrder[]>;
}

// Import and export the implementation instance
import OrderRepositoryImpl from "./repositoryImpl/order.repository.impl";
export default OrderRepositoryImpl;
