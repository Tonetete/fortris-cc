import { Account } from "@fortris-cc/types";

export const getAccounts = (): Account[] => [
  {
    _id: '5f9d9b3b9d3b1d0b1c9d4401',
    account_name: 'Account User 1',
    tag: 'test',
    category: 'treasury',
    balance: 3.0,
    available_balance: 1.2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: '5f9d9b3b9d3b1d0b1c9d4402',
    account_name: 'Account User 2',
    tag: 'test',
    category: 'treasury',
    balance: 1.233,
    available_balance: 3.4,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: '5f9d9b3b9d3b1d0b1c9d4403',
    account_name: 'Account User 3',
    tag: 'test',
    category: 'treasury',
    balance: 1.23,
    available_balance: 3.45,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
