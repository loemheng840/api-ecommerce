import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { UserService } from "../user.service";
import userRepository from "../../repository/repositoryImpl/user.repository.impl";

class UserServiceImpl implements UserService {
  async deleteUser(req: Request, res: Response): Promise<Response | void> {
    try {
      // Get user ID from token (set by authMiddleware)
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: "Not authenticated",
        });
      }

      // Delete user
      const user = await userRepository.deleteById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: unknown) {
      console.error("Error deleting user:", error);
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }
  async createUser(req: Request, res: Response): Promise<Response | void> {
    try {
      const hashedPassword = await hash(req.body.password, 10);

      // create new user
      const user = await userRepository.save({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      // Respond with success
      return res.status(201).json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
        message: "User created successfully",
      });
    } catch (error: unknown) {
      console.error("Error creating user:", error);
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response | void> {
    try {
      const user = await userRepository.findById(req.params.id as string);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      return res.status(200).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdDate: user.createdDate,
        },
      });
    } catch (error: unknown) {
      console.error("Error fetching user:", error);
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response | void> {
    try {
      // Get user ID from token (set by authMiddleware)
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: "Not authenticated",
        });
      }

      // Prepare update data (exclude password from direct update)
      const updateData = {
        name: req.body.name,
        email: req.body.email,
      };

      // Update user
      const user = await userRepository.updateById(userId, updateData);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      return res.status(200).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        message: "User updated successfully",
      });
    } catch (error: unknown) {
      console.error("Error updating user:", error);
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }
}

export default new UserServiceImpl();
