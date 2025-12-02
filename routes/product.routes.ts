import { Router } from "express";
import productController from "../controller/product.controller";
import { authorization, verifyToken } from "../middleware/middleware";

const router = Router();

router.post(
  "",
  verifyToken,
  authorization("admin"),
  productController.createProduct
);
router.put(
  "/:id",
  verifyToken,
  authorization("admin"),
  productController.updateProduct
);
router.delete(
  "/:id",
  verifyToken,
  authorization("admin"),
  productController.deleteProductById
);

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

export default router;
