export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  balance : number;
  role: 'admin' | 'customer';
  created_at: string;
}
