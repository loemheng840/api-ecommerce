import { Request, Response } from "express";

export interface UserService {
  createUser: (req: Request, res: Response) => Promise<Response | void>;
  getUserById: (req: Request, res: Response) => Promise<Response | void>;
  updateUser: (req: Request, res: Response) => Promise<Response | void>;
  deleteUser:(req: Request, res: Response) => Promise<Response | void>;
}

// Import and export the implementation instance
import UserServiceImpl from "./serviceImpl/user.service.impl";
export default UserServiceImpl;
