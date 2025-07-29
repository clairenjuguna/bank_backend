import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as UserModel from "../models/userModel";
import { generateToken } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  try {
     console.log("Register endpoint hit. Body:", req.body);
    const { first_name, last_name, email, password, role = 'customer' } = req.body;

    const existing = await UserModel.getUserByEmail(email);
    console.log("Existing user:", existing);

    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const password_hash = await bcrypt.hash(password, 10);

    const user = await UserModel.createUser({
      first_name,
      last_name,
      email,
      password_hash,
      role,
      balance: 0, // Default balance for new users
    });

    res.status(201).json(user);
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.getAllUsers();
    // Return balances with users
    res.json(users.map(user => ({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      balance: user.balance
    })));
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.getUserById(Number(id));
    if (!user) return res.status(404).json({ error: "User not found" });
    // Return balance with user
    res.json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      balance: user.balance // <-- include balance
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await UserModel.getAllCustomers(); 
    // Return balances with customers
    return res.json(customers.map(user => ({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      balance: user.balance 
    })));
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.json({
      access: token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const { first_name, last_name, email, role, balance } = req.body;

  try {
    const updatedUser = await UserModel.updateUser(userId, {
      first_name,
      last_name,
      email,
      role,
      balance,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

