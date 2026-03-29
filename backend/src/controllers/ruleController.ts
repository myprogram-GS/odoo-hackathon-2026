import { Request, Response } from "express";
import Rule from "../models/Rule";

export const createRule = async (req: Request, res: Response) => {
  const rule = new Rule(req.body);
  await rule.save();
  res.json(rule);
};

export const getRules = async (_req: Request, res: Response) => {
  const rules = await Rule.find();
  res.json(rules);
};