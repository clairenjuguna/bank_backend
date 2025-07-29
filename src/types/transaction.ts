export interface Transaction {
  id: number;
  sender_id: number;
  receiver_id: number;
  amount: number;
  type: 'debit' | 'credit';
  status: string;
  note?: string;
  created_at: Date;
}
