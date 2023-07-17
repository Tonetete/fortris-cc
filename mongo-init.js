// mongo-init.js

db = db.getSiblingDB("accounts_fortris");

// Create Account collection and insert documents
db.createCollection("accounts");
db.accounts.insertMany([
  {
    _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4401"),
    account_name: "Account User 1",
    tag: "test",
    category: "treasury",
    balance: 0.0,
    available_balance: 0.0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4402"),
    account_name: "Account User 2",
    tag: "test",
    category: "treasury",
    balance: 0.0,
    available_balance: 0.0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4403"),
    account_name: "Account User 3",
    tag: "test",
    category: "treasury",
    balance: 0.0,
    available_balance: 0.0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4404",
    account_name: "Account User 4",
    tag: "test",
    category: "treasury",
    balance: 50.75,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4405",
    account_name: "Account User 5",
    tag: "test",
    category: "treasury",
    balance: 1000,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4406",
    account_name: "Account User 6",
    tag: "test",
    category: "treasury",
    balance: 250.99,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4407",
    account_name: "Account User 7",
    tag: "test",
    category: "treasury",
    balance: 75.25,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4408",
    account_name: "Account User 8",
    tag: "test",
    category: "treasury",
    balance: 500.55,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4409",
    account_name: "Account User 9",
    tag: "test",
    category: "treasury",
    balance: 100,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4410",
    account_name: "Account User 10",
    tag: "test",
    category: "treasury",
    balance: 1000.75,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4411",
    account_name: "Account User 11",
    tag: "test",
    category: "treasury",
    balance: 350,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4412",
    account_name: "Account User 12",
    tag: "test",
    category: "treasury",
    balance: 75,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4413",
    account_name: "Account User 13",
    tag: "test",
    category: "treasury",
    balance: 450.99,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4414",
    account_name: "Account User 14",
    tag: "test",
    category: "treasury",
    balance: 125.25,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
  {
    _id: "5f9d9b3b9d3b1d0b1c9d4415",
    account_name: "Account User 15",
    tag: "test",
    category: "treasury",
    balance: 800.55,
    available_balance: 0,
    created_at: "2023-07-12T18:06:37.722Z",
    updated_at: "2023-07-12T18:06:37.722Z"
  },
]);

// Create Transaction collection and insert documents
db.createCollection("transactions");
db.transactions.insertMany([
  {
    _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4411"),
    account_id: "5f9d9b3b9d3b1d0b1c9d4401",
    order_id: "test1",
    order_code: "treasury1",
    transaction_type: "Payment Received",
    debit: "",
    credit: 0.0,
    balance: 0.0,
    created_at: new Date(),
  },
  {
    _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4412"),
    account_id: "5f9d9b3b9d3b1d0b1c9d4402",
    order_id: "test2",
    order_code: "treasury2",
    transaction_type: "Payment Received",
    debit: "",
    credit: 0.0,
    balance: 0.0,
    created_at: new Date(),
  },
  {
    _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4413"),
    account_id: "5f9d9b3b9d3b1d0b1c9d4403",
    order_id: "test3",
    order_code: "treasury3",
    transaction_type: "Payment Received",
    debit: "",
    credit: 0.0,
    balance: 0.0,
    created_at: new Date(),
  },
]);

db.transactions.createIndex({ "order_id": 1 }, { unique: true });
db.transactions.createIndex({ "order_code": 1 }, { unique: true });
