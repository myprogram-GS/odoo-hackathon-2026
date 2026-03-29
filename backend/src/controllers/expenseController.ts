import { Request, Response } from "express";
import Expense from "../models/Expense";

//Add Expense
export const addExpense = async (req: Request, res: Response) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
};


//Get All Expenses
export const getExpenses = async (_req: Request, res: Response) => {
  const expenses = await Expense.find();
  res.json(expenses);
};