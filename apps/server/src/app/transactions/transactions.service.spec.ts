import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model } from 'mongoose';
import { connect } from 'mongoose';
import { getAccounts } from '../__mock__/accounts.mock';
import { getTransactions } from '../__mock__/transactions.mock';
import { Accounts, AccountsSchema } from '../accounts/entities/accounts.entity';
import {
  Transactions,
  TransactionsSchema,
} from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let mongoConnection: Connection;
  let mongod: MongoMemoryServer;
  let accountsModel: Model<Accounts>;
  let transactionsModel: Model<Transactions>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;

    accountsModel = mongoConnection.model(Accounts.name, AccountsSchema);
    transactionsModel = mongoConnection.model(
      Transactions.name,
      TransactionsSchema
    );

    await accountsModel.insertMany(getAccounts());
    await transactionsModel.insertMany(getTransactions());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getModelToken(Transactions.name),
          useValue: transactionsModel,
        },
        {
          provide: getModelToken(Accounts.name),
          useValue: accountsModel,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  describe('findAll', () => {
    it('SHOULD return an array of transactions WHEN function is called', async () => {
      const transactions = getTransactions();
      const result = await service.findAll();

      expect(result.length).toBe(transactions.length);
      expect(result[0].id).toBe(transactions[0]._id);
    });
  });

  describe('create', () => {
    it('SHOULD fail creating a transactions WHEN function is called because no account id exists with that id', async () => {
      const payload = {
        _id: '5f9d9b3b9d3b1d0b1c914411',
        account_id: '5f9d9b3b9d3b1d0b1c914411',
        order_id: 'test',
        order_code: 'test',
        transaction_type: 'Payment Not Received',
        debit: '',
        credit: 1.0,
        balance: 2.0,
        created_at: new Date(),
      };

      try {
        await service.create(payload);
      } catch (error) {
        expect(error.message).toBe('Account ID Not Found');
      }
    });

    it('SHOULD create a transactions WHEN function is called', async () => {
      const payload = {
        _id: '5f9d9b3b9d3b1d0b1c914431',
        account_id: '5f9d9b3b9d3b1d0b1c9d4401',
        order_id: 'test',
        order_code: 'test',
        transaction_type: 'Payment Not Received',
        debit: '',
        credit: 1.0,
        balance: 2.0,
        created_at: new Date(),
      };

      const transactionCreated = await service.create(payload);

      expect(transactionCreated.transaction_type).toBe(
        payload.transaction_type
      );
      expect(transactionCreated.debit).toBe(payload.debit);
      expect(transactionCreated.credit).toBe(payload.credit);
      expect(transactionCreated.balance).toBe(payload.balance);
    });
  });

  describe('findByAccountId', () => {
    it('SHOULD return all transactions WHEN function is called for an account id', async () => {
      const accounts = getAccounts();
      const transactionsByAccountId = getTransactions().filter(
        (t) => t.account_id === accounts[1]._id
      );
      const result = await service.findByAccountId(accounts[1]._id);
      const transactionMatchAllAccountIds = result.every(
        (t) => t.account_id === accounts[1]._id
      );

      expect(transactionMatchAllAccountIds).toBe(true);
      expect(result.length).toBe(transactionsByAccountId.length);
    });
  });

  describe('findOne', () => {
    it('SHOULD return a transaction passing an id WHEN function is called', async () => {
      const transactions = getTransactions();
      const transaction = transactions[0];
      const result = await service.findOne(transaction._id);

      expect(result.id).toBe(transaction._id);
    });
  });

  describe('update', () => {
    it('SHOULD update a transactions WHEN function is called for a transaction id', async () => {
      const transaction = getTransactions()[0];

      const payload = {
        transaction_type: 'Payment Not Received',
        debit: '',
        credit: 1.0,
        balance: 2.0,
      };

      await service.update(transaction._id, payload);
      const result = await service.findOne(transaction._id);

      expect(result.transaction_type).toBe(payload.transaction_type);
      expect(result.debit).toBe(payload.debit);
      expect(result.credit).toBe(payload.credit);
      expect(result.balance).toBe(payload.balance);
    });
  });

  describe('remove', () => {
    it('SHOULD remove a transactions WHEN function is called for a transaction id', async () => {
      const transaction = getTransactions()[0];
      const result = await service.remove(transaction._id);

      expect(result.deletedCount).toBe(1);
    });
  });
});
