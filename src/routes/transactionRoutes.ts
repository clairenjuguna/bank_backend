import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
  getTransactionsByUser,
} from "../controllers/transactionController";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Create a new transaction (only for authenticated users)
router.post("/", authenticate, createTransaction);

// Get all transactions (admin use only — you can protect with role later)
router.get("/", authenticate, getAllTransactions);

// Get transactions for a specific user
router.get("/user/:id", authenticate, getTransactionsByUser);



export default router;