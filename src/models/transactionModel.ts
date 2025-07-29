import pool from '../config/db';
import { Transaction } from '../types/transaction';

export const createTransaction = async (tx: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction> => {
  const { sender_id, receiver_id, amount, type, status, note } = tx;

  const result = await pool.query(
    `INSERT INTO transactions (sender_id, receiver_id, amount, type, status, note)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [sender_id, receiver_id, amount, type, status, note]
  );

  return result.rows[0];
};

export const getTransactionsByUser = async (userId: number): Promise<Transaction[]> => {
  const result = await pool.query(
    `SELECT * FROM transactions 
     WHERE sender_id = $1 OR receiver_id = $1 
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const result = await pool.query('SELECT * FROM transactions ORDER BY created_at DESC');
  return result.rows;
};