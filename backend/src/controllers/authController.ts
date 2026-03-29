import { Request, Response } from "express";
import User from "../models/User";

// ✅ SIGNUP
export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, companyName, country, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      fullName,
      email,
      password,
      companyName,
      country,
      role,
    });

    await user.save();

    res.json({ message: "Signup successful", user });
  } catch (error) {
    res.status(500).json({ message: "Signup error" });
  }
};

// ✅ LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, password, role });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};