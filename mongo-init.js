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
    credit: 3.0,
    balance: 2.0,
    created_at: new Date(),
  },
  {
    _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4412"),
    account_id: "5f9d9b3b9d3b1d0b1c9d4402",
    order_id: "test2",
    order_code: "treasury2",
    transaction_type: "Payment Received",
    debit: "",
    credit: 23.0,
    balance: 33.0,
    created_at: new Date(),
  },
  {
    _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4413"),
    account_id: "5f9d9b3b9d3b1d0b1c9d4403",
    order_id: "test3",
    order_code: "treasury3",
    transaction_type: "Payment Received",
    debit: "",
    credit: 2.4,
    balance: 0.0,
    created_at: new Date(),
  },
  {
    _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4414"),
    account_id: "5f9d9b3b9d3b1d0b1c9d4402",
    order_id: "test4",
    order_code: "treasury4",
    transaction_type: "Payment Received",
    debit: "",
    credit: 0.0,
    balance: 0.0,
    created_at: new Date()
 },
 {
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4415"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4402",
  order_id: "test5",
  order_code: "treasury5",
  transaction_type: "Payment Received",
  debit: "",
  credit: 54.0,
  balance: 32.0,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4416"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4402",
  order_id: "test6",
  order_code: "treasury6",
  transaction_type: "Payment Received",
  debit: "",
  credit: 11.0,
  balance: 33.0,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4417"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4403",
  order_id: "test7",
  order_code: "treasury7",
  transaction_type: "Payment Received",
  debit: "",
  credit: 11.0,
  balance: 23.0,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4418"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4403",
  order_id: "test8",
  order_code: "treasury8",
  transaction_type: "Payment Received",
  debit: "",
  credit: 110.0,
  balance: 32.0,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4419"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4403",
  order_id: "test9",
  order_code: "treasury9",
  transaction_type: "Payment Received",
  debit: "",
  credit: 1.0,
  balance: 20.0,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4420"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4404",
  order_id: "test10",
  order_code: "treasury10",
  transaction_type: "Payment Received",
  debit: "",
  credit: 20.0,
  balance: 3.0,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4421"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4404",
  order_id: "test11",
  order_code: "treasury11",
  transaction_type: "Payment Received",
  debit: "",
  credit: 20.0,
  balance: 3.0,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4422"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4404",
  order_id: "test12",
  order_code: "treasury12",
  transaction_type: "Payment Received",
  debit: "",
  credit: 21.0,
  balance: 32.0,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4423"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4404",
  order_id: "test13",
  order_code: "treasury13",
  transaction_type: "Payment Received",
  debit: "",
  credit: 1.0,
  balance: 122.0,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4424"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4404",
  order_id: "test112",
  order_code: "treasury112",
  transaction_type: "Payment Received",
  debit: "",
  credit: 21.0,
  balance: 2.0,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4425"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4405",
  order_id: "test113",
  order_code: "treasury113",
  transaction_type: "Payment Received",
  debit: "",
  credit: 75.25,
  balance: 250.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4426"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4405",
  order_id: "test14",
  order_code: "treasury14",
  transaction_type: "Payment Received",
  debit: "",
  credit: 15.25,
  balance: 210.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4427"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4405",
  order_id: "test15",
  order_code: "treasury15",
  transaction_type: "Payment Received",
  debit: "",
  credit: 25.25,
  balance: 350.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4428"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4406",
  order_id: "test16",
  order_code: "treasury16",
  transaction_type: "Payment Received",
  debit: "",
  credit: 25.25,
  balance: 350.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4429"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4406",
  order_id: "test17",
  order_code: "treasury17",
  transaction_type: "Payment Received",
  debit: "",
  credit: 25.25,
  balance: 350.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4430"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4406",
  order_id: "test18",
  order_code: "treasury18",
  transaction_type: "Payment Received",
  debit: "",
  credit: 25.25,
  balance: 350.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4429"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4407",
  order_id: "test19",
  order_code: "treasury19",
  transaction_type: "Payment Received",
  debit: "",
  credit: 25.25,
  balance: 350.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4430"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4407",
  order_id: "test20",
  order_code: "treasury20",
  transaction_type: "Payment Received",
  debit: "",
  credit: 25.25,
  balance: 350.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4431"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4407",
  order_id: "test21",
  order_code: "treasury21",
  transaction_type: "Payment Received",
  debit: "",
  credit: 25.25,
  balance: 350.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4432"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4408",
  order_id: "test22",
  order_code: "treasury22",
  transaction_type: "Payment Received",
  debit: "",
  credit: 25.25,
  balance: 350.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4433"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4408",
  order_id: "test23",
  order_code: "treasury23",
  transaction_type: "Payment Received",
  debit: "",
  credit: 25.25,
  balance: 350.50,
  created_at: new Date()
},
{
  _id: ObjectId("5f9d9b3b9d3b1d0b1c9d4434"),
  account_id: "5f9d9b3b9d3b1d0b1c9d4408",
  order_id: "test24",
  order_code: "treasury24",
  transaction_type: "Payment Received",
  debit: "",
  credit: 25.25,
  balance: 350.50,
  created_at: new Date()
},

 
]);

db.transactions.createIndex({ "order_id": 1 }, { unique: true });
db.transactions.createIndex({ "order_code": 1 }, { unique: true });
