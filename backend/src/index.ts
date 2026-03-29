import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

//  Import routes (create these files next)
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import ruleRoutes from "./routes/ruleRoutes";

dotenv.config();

const app = express();

//  Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_DB_URL as string)
  .then(() => {
    console.log(" MongoDB Atlas Connected Successfully");
  })
  .catch((err: any) => {
    console.log(" Connection Error:");
    console.log(err);
  });

//  Test Route
app.get("/", (req: Request, res: Response) => {
  res.send(" Backend running successfully");
});


//  NEW: API ROUTES (VERY IMPORTANT)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/rules", ruleRoutes);


//  Start Server
app.listen(5000, () => {
  console.log(" Server running on port 5000");
});