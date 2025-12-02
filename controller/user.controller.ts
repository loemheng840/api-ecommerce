import UserService from "../service/user.service";
import { Request, Response } from "express";

async function getUserById(req: Request, res: Response) {
  return UserService.getUserById(req, res);
}

async function updateUser(req: Request, res: Response) {
  return UserService.updateUser(req, res);
}

export default {
  getUserById,
  updateUser,
};
