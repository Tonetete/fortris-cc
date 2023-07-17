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
