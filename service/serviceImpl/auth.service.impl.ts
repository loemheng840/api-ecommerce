import { generateToken } from "../../utils/generateToken";
import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import { AuthService } from "../auth.service";
import userRepository from "../../repository/repositoryImpl/user.repository.impl";

class AuthServiceImpl implements AuthService {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      // Find user by email
      const user = await userRepository.findByEmail(email);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      // Check password
      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
      }

      // Generate token
      const token = generateToken(user._id.toString());

      // Respond with user data and token
      return res.status(200).json({
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          token: token,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  }

  async registerAsAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      // Hash password
      const hashedPassword = await hash(password, 10);

      // create new admin user
      const adminUser = await userRepository.save({
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });

      // Respond with success
      return res.status(201).json({
        success: true,
        data: {
          name: adminUser.name,
          email: adminUser.email,
        },
        message: "Admin user created successfully",
      });
    } catch (error: unknown) {
      console.error("Error creating admin user:", error);
      return res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }
}

export default new AuthServiceImpl();
