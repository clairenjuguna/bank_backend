import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};