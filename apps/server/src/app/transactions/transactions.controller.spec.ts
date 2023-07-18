import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { getAccounts } from '../__mock__/accounts.mock';
import { getTransactions } from '../__mock__/transactions.mock';
import { AccountsService } from '../accounts/accounts.service';
import { Accounts, AccountsSchema } from '../accounts/entities/accounts.entity';
import {
  Transactions,
  TransactionsSchema,
} from './entities/transaction.entity';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
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

    accountsModel.insertMany(getAccounts());
    transactionsModel.insertMany(getTransactions());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        AccountsService,
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

    controller = module.get<TransactionsController>(TransactionsController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('SHOULD return an array of transactions WHEN call findAll function', async () => {
    const transactions = getTransactions();

    controller.findAll().then((result) => {
      expect(result.length).toBe(transactions.length);
      expect(result[0].id).toBe(transactions[0]._id);
    });
  });
});
