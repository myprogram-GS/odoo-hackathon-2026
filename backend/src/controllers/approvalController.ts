import { Request, Response } from "express";
import Expense from "../models/Expense";

export const approveExpense = async (req: Request, res: Response) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, {
    status: "approved"
  });

  res.json(expense);
};

export const rejectExpense = async (req: Request, res: Response) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, {
    status: "rejected"
  });

  res.json(expense);
};