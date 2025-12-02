import AuthService from "../service/auth.service";
import UserService from "../service/user.service";
import { Request, Response } from "express";

async function login(req: Request, res: Response) {
  return AuthService.login(req, res);
}

async function registerAsAdmin(req: Request, res: Response) {
  return AuthService.registerAsAdmin(req, res);
}

async function registerAsUser(req: Request, res: Response) {
  return UserService.createUser(req, res);
}

export default {
  login,
  registerAsAdmin,
  registerAsUser,
};
