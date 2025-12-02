import orderService from "../service/order.service";

const createOrder = async (req: any, res: any) => {
  return orderService.createOrder(req, res);
};

const getOrderById = async (req: any, res: any) => {
  return orderService.getOrderById(req, res);
};

const getAllOrders = async (_req: any, res: any) => {
  return orderService.getAllOrders(res);
};

const findOrderByUserId = async (req: any, res: any) => {
  return orderService.findOrderByUserId(req, res);
};

export default {
  createOrder,
  getOrderById,
  getAllOrders,
  findOrderByUserId,
};
