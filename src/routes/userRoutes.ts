import express from "express";
import { login } from "../controllers/userController";


import { getCustomers } from "../controllers/userController";


import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

// Register new user
router.post("/register", registerUser);


router.post("/login", login); 


router.get("/users", authenticate, getAllUsers);

router.get("/customers", authenticate, getCustomers);
// Get a user by ID (protected)
router.get("/users/:id", authenticate, getUserById);


router.put("/users/:id", authenticate, updateUser);

export default router;