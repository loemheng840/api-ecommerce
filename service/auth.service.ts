import { Request, Response } from "express";
import AuthServiceImpl from "./serviceImpl/auth.service.impl";

export interface AuthService {
  login: (req: Request, res: Response) => Promise<Response>;
  registerAsAdmin: (req: Request, res: Response) => Promise<Response>;
}

export default AuthServiceImpl;
