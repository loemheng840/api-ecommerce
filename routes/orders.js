const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder); // Create order
router.get("/", orderController.getAllOrders); // Get all orders
router.get("/:id", orderController.getOrderById); // Get order by ID
router.get("/user/:userId", orderController.getOrdersByUser); // Get orders by user
router.patch("/:id/status", orderController.updateOrderStatus); // Update order status
router.delete("/:id", orderController.cancelOrder); // Cancel order

module.exports = router;
