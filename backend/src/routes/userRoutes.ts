import express, { Request, Response } from "express";


const router = express.Router();

// TEST API
router.get("/", (req: Request, res: Response) => {
  res.json([
    { name: "Gauri", role: "admin" },
    { name: "Simon", role: "developer" }
  ]);

  
});

export default router;