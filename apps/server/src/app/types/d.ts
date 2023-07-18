export interface Account {
    _id: string;
    account_name: string;
    tag: string;
    category: string;
    balance: number;
    available_balance: number;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Transaction {
    _id: string;
    account_id: string;
    order_id: string;
    order_code: string;
    transaction_type: string;
    debit: string;
    credit: number;
    balance: number;
    created_at: Date;
  }