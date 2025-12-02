import { Types,} from "mongoose";
import Order, { IOrder } from "../../model/order.domain";
import { OrderRepository } from "../order.repository";
class OrderRepositoryImpl implements OrderRepository {
  async save(orderData: Partial<IOrder>): Promise<IOrder> {
    const order = new Order(orderData);
    return await order.save();
  }

  async findById(orderId: string): Promise<IOrder | null> {
    return await Order.findById(orderId);
  }
  async findByUserId(userId: string): Promise<IOrder[]> {
    return await Order.find({ userId: new Types.ObjectId(userId) });
  }

  async findAll(): Promise<IOrder[]> {
    return await Order.find();
  }
}

export default new OrderRepositoryImpl();
