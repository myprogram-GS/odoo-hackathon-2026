import express from "express";
import { addExpense, getExpenses } from "../controllers/expenseController";
import { approveExpense, rejectExpense } from "../controllers/approvalController";

const router = express.Router();

router.post("/", addExpense);
router.get("/", getExpenses);
router.put("/approve/:id", approveExpense);
router.put("/reject/:id", rejectExpense);

export default router;