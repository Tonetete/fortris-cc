import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model } from 'mongoose';
import { AccountsService } from '../accounts/accounts.service';
import { Accounts } from '../accounts/entities/accounts.entity';
import { Transactions } from './entities/transaction.entity';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { getTransactions } from '../__mock__/transactions.mock';
import { getAccounts } from '../__mock__/accounts.mock';

const transactions = getTransactions();
const accounts = getAccounts();
class TransactionsServiceMock {
  create(createTransactionDto: CreateTransactionDto) {
    return {
      ...createTransactionDto,
    };
  }
  findAll() {
    return transactions;
  }
  findOne(id: string) {
    return transactions.find((a) => a._id === id);
  }
  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return {
      ...updateTransactionDto,
    };
  }
  remove(id: string) {
    return {
      _id: id,
    };
  }

  findByAccountId(account_id: string) {
    return transactions.filter((t) => t.account_id === account_id);
  }
}

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        { provide: TransactionsService, useClass: TransactionsServiceMock },
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
    transactionsController = module.get<TransactionsController>(
      TransactionsController
    );
  });

  describe('create', () => {
    it('THEN transactionService.create SHOULD be called with the provided createTransactionDto', () => {
      jest.spyOn(transactionsService, 'create');
      const newTransaction = {
        ...transactions[0],
        _id: '123456789abcdef',
      };
      const createTransactionDto: CreateTransactionDto = {
        ...newTransaction,
      };

      transactionsController.create(createTransactionDto);

      expect(transactionsService.create).toHaveBeenCalledWith(
        createTransactionDto
      );
    });
  });

  describe('findAll', () => {
    it('THEN transactionsService.findAll SHOULD be called and return the result', () => {
      jest.spyOn(transactionsService, 'findAll');

      const result = transactionsController.findAll();

      expect(transactionsService.findAll).toHaveBeenCalled();
      expect(result).toEqual(transactions);
    });
  });

  describe('findOne', () => {
    it('THEN transactionsService.findOne SHOULD be called with the provided id and return the result', () => {
      const transaction_id = '5f9d9b3b9d3b1d0b1c9d4411';

      jest.spyOn(transactionsService, 'findOne');

      const result = transactionsController.findOne(transaction_id);

      expect(transactionsService.findOne).toHaveBeenCalledWith(transaction_id);
      expect(result).toEqual(
        transactions.filter((a) => a._id === transaction_id)[0]
      );
    });
  });

  describe('findByAccountId', () => {
    it('THEN transactionsService.findTransactionsByAccountId SHOULD be called with the provided id and return the result', () => {
      const account_id = '5f9d9b3b9d3b1d0b1c9d4401';

      jest.spyOn(transactionsService, 'findByAccountId');

      const result = transactionsController.findByAccountId(account_id);

      expect(transactionsService.findByAccountId).toHaveBeenCalledWith(account_id);
      expect(result).toEqual(
        transactions.filter((t) => t.account_id === account_id)
      );
    });
  });

  describe('update', () => {
    it('THEN transactionsService.update SHOULD be called with the provided id and updateAccountsDto', () => {
      jest.spyOn(transactionsService, 'update');
      const account_id = '5f9d9b3b9d3b1d0b1c9d4411';
      const updateAccountsDto: UpdateTransactionDto = {
        balance: 100,
      };

      transactionsController.update(account_id, updateAccountsDto);

      expect(transactionsService.update).toHaveBeenCalledWith(
        account_id,
        updateAccountsDto
      );
    });
  });

  describe('remove', () => {
    it('THEN transactionsService.remove SHOULD be called with the provided id', () => {
      jest.spyOn(transactionsService, 'remove');
      const account_id = '5f9d9b3b9d3b1d0b1c9d4411';

      transactionsController.remove(account_id);

      expect(transactionsService.remove).toHaveBeenCalledWith(account_id);
    });
  });
});
