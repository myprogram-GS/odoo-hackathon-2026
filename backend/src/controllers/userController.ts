import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find().populate("managerId");
  res.json(users);
};