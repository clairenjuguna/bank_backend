import { Request, Response } from 'express';
import * as TransactionModel from '../models/transactionModel';
import * as UserModel from '../models/userModel';

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { sender_id, receiver_id, amount, note } = req.body;

    if (!sender_id || !receiver_id || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sender = await UserModel.getUserById(sender_id);
    const receiver = await UserModel.getUserById(receiver_id);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    if (Number(sender.balance) < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Debit sender
    await UserModel.updateUserBalance(sender_id, Number(sender.balance) - amount);

    // Credit receiver
    await UserModel.updateUserBalance(receiver_id, Number(receiver.balance) + amount);

    const transaction = await TransactionModel.createTransaction({
      sender_id,
      receiver_id,
      amount,
      note,
      type: 'debit',
      status: 'completed',
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error('Transaction error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllTransactions = async (_req: Request, res: Response) => {
  try {
    const txs = await TransactionModel.getAllTransactions();
    res.json(txs);
  } catch (err) {
    console.error('Fetch all transactions error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTransactionsByUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  try {
    const txs = await TransactionModel.getTransactionsByUser(userId);
    res.json(txs);
  } catch (err) {
    console.error('Get transactions error:', err);
    res.status(500).json({ error: 'Internal server error' });
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
