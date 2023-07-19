export interface Account {
  _id?: string;
  account_name: string;
  tag: string;
  category: string;
  balance: number;
  available_balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface Transaction {
  _id?: string;
  account_id: string;
  order_id: string;
  order_code: string;
  transaction_type: string;
  debit: string;
  credit: number;
  balance: number;
  created_at: Date;
}

export interface USDBTCPrice
{
  code: string,
  rate: string,
  description: string,
  rate_float: number
}

export type TransactionDisplayColumns = Pick<
  Transaction,
  | 'created_at'
  | 'order_id'
  | 'order_code'
  | 'transaction_type'
  | 'debit'
  | 'credit'
  | 'balance'
>;

export type AccountDisplayColumns = Pick<
  Account,
  'account_name' | 'category' | 'tag' | 'balance' | 'available_balance'
>;

export type BreadcrumbPath = { path: string, alias: string }[];