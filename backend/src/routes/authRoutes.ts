import express from "express";
import { signup, login, getUsers } from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getUsers);

export default router;