import { Router } from "express";
import orderController from "../controller/order.controller";
import { authorization, verifyToken } from "../middleware/middleware";

const router = Router();

router.post(
  "",
  verifyToken,
  authorization("user", "admin"),
  orderController.createOrder
);
router.get(
  "/:id",
  verifyToken,
  authorization("user", "admin"),
  orderController.getOrderById
);
router.get(
  "/user/:userId",
  verifyToken,
  authorization("user", "admin"),
  orderController.findOrderByUserId
);
router.get(
  "",
  verifyToken,
  authorization("admin"),
  orderController.getAllOrders
);

export default router;
