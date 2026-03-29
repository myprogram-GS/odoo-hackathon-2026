import { Request, Response } from "express";
import User from "../models/User";


// 🔐 SIGNUP (CREATE ACCOUNT)
export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, companyName, country, role } = req.body;

    // check existing user
    const existing = await User.findOne({ email , password });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }else{
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = new User({
      fullName,
      email,
      password,
      companyName,
      country,
      role
    });

    await user.save();

    res.json({
      message: "Signup successful",
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Signup error", err });
  }
};


// 🔓 LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Login error", err });
  }
};


// 📄 GET ALL USERS
export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};