import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { Accounts, AccountsSchema } from './entities/accounts.entity';
import { getAccounts } from '../__mock__/accounts.mock';
import { getModelToken } from '@nestjs/mongoose';

describe('AccountService', () => {
  let service: AccountsService;
  let mongoConnection: Connection;
  let mongod: MongoMemoryServer;
  let accountsModel: Model<Accounts>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;

    accountsModel = mongoConnection.model(Accounts.name, AccountsSchema);

    await accountsModel.insertMany(getAccounts());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getModelToken(Accounts.name),
          useValue: accountsModel,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  describe('findAll', () => {
    it('SHOULD return an array of accounts WHEN function is called', async () => {
      const accounts = getAccounts();
      const result = await service.findAll();

      expect(result.length).toBe(accounts.length);
      expect(result[0].id).toBe(accounts[0]._id);
    });
  });

  describe('findOne', () => {
    it('SHOULD return an account passing an id WHEN function is called', async () => {
      const accounts = getAccounts();
      const result = await service.findOne(accounts[0]._id);

      expect(result.id).toBe(accounts[0]._id);
    });
  });

  describe('update', () => {
    it('SHOULD update an account WHEN function is called for an account id', async () => {
      const account = getAccounts()[0];

      const payload = {
        category: 'test-category',
        tag: 'test-tag',
        available_balance: 11.0,
        updated_at: new Date(),
      };

      await service.update(account._id, payload);
      const result = await service.findOne(account._id);

      expect(result.category).toBe(payload.category);
      expect(result.tag).toBe(payload.tag);
      expect(result.available_balance).toBe(payload.available_balance);
    });
  });

  describe('remove', () => {
    it('SHOULD remove an account WHEN function is called for an account id', async () => {
      const account = getAccounts()[0];
      const result = await service.remove(account._id);

      expect(result.deletedCount).toBe(1);
    });
  });
});
