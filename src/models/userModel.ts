import pool from '../config/db';
import { User } from '../types/user';

export const createUser = async (
  user: Omit<User, 'id' | 'created_at'>
): Promise<User> => {
  const { first_name, last_name, email, password_hash, role } = user;
  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password_hash, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, first_name, last_name, email, role, created_at`,
    [first_name, last_name, email, password_hash, role]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0] || null;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result.rows[0] || null;
};

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query(
    'SELECT id, first_name, last_name, email, role, balance, created_at FROM users'
  );
  return result.rows as User[];
};

export const getAllCustomers = async (): Promise<User[]> => {
  const result = await pool.query(
    `SELECT id, first_name, last_name, email, role, balance, created_at 
     FROM users 
     WHERE role = 'customer'`
  );
  return result.rows as User[];
};

export const updateUserBalance = async (userId: number, newBalance: number): Promise<void> => {
  await pool.query(`UPDATE users SET balance = $1 WHERE id = $2`, [newBalance, userId]);
};

export const updateUser = async (
  userId: number,
  updates: Partial<User>
): Promise<User | null> => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const key in updates) {
    fields.push(`${key} = $${index}`);
    values.push((updates as any)[key]);
    index++;
  }

  if (fields.length === 0) return null;

  values.push(userId); 
  const result = await pool.query(
    `UPDATE users SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`,
    values
  );

  return result.rows[0] || null;
};
