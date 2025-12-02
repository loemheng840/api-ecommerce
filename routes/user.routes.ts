import { Router } from "express";
const router = Router();
import UserController from "../controller/user.controller";
import { validate } from "../middleware/validate";
import { registerUser, updateUser } from "../middleware/user.middleware";
import { verifyToken } from "../middleware/middleware";

// Define user routes
router.get("/:id",validate(registerUser) ,UserController.getUserById);

// Update user
router.put("/user",validate(updateUser),verifyToken , UserController.updateUser);

export default router;
