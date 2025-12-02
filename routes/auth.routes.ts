import { Router } from "express";
const router = Router();
import authController from "../controller/auth.controller";
import { verifyToken } from "../middleware/middleware";
import { authorization } from "../middleware/middleware";

// Define authentication routes
router.post("/register", authController.registerAsUser);
router.post("/login", authController.login);
// Admin registration route
router.post(
  "/register-admin",
  verifyToken,
  authorization("admin"),
  authController.registerAsAdmin
);

export default router;
