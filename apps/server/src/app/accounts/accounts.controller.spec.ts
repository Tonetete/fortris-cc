import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { CreateAccountsDto } from './dto/create-accounts.dto';
import { UpdateAccountsDto } from './dto/update-accounts.dto';
import { getAccounts } from '../__mock__/accounts.mock';

const accounts = getAccounts();

class AccountsServiceMock {
  create(createAccountsDto: CreateAccountsDto) {
    return {
      ...createAccountsDto,
    };
  }
  findAll() {
    return accounts;
  }
  findOne(id: string) {
    return accounts.find((a) => a._id === id);
  }
  update(id: string, updateAccountsDto: UpdateAccountsDto) {
    return {
      ...updateAccountsDto,
    };
  }
  remove(id: string) {
    return {
      _id: id,
    };
  }
}

describe('AccountsController', () => {
  let accountsController: AccountsController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [{ provide: AccountsService, useClass: AccountsServiceMock }],
    }).compile();

    accountsService = module.get<AccountsService>(AccountsService);
    accountsController = module.get<AccountsController>(AccountsController);
  });

  describe('create', () => {
    it('THEN accountsService.create SHOULD be called with the provided createAccountsDto', () => {
      jest.spyOn(accountsService, 'create');
      const newAccount = {
        ...accounts[0],
        _id: '123456789abcdef',
      };
      const createAccountsDto: CreateAccountsDto = {
        ...newAccount,
      };

      accountsController.create(createAccountsDto);

      expect(accountsService.create).toHaveBeenCalledWith(createAccountsDto);
    });
  });

  describe('findAll', () => {
    it('THEN accountsService.findAll SHOULD be called and return the result', () => {
      jest.spyOn(accountsService, 'findAll');

      const result = accountsController.findAll();

      expect(accountsService.findAll).toHaveBeenCalled();
      expect(result).toEqual(accounts);
    });
  });

  describe('findOne', () => {
    it('THEN accountsService.findOne SHOULD be called with the provided id and return the result', () => {
      const account_id = '5f9d9b3b9d3b1d0b1c9d4401';

      jest.spyOn(accountsService, 'findOne');

      const result = accountsController.findOne(account_id);

      expect(accountsService.findOne).toHaveBeenCalledWith(account_id);
      expect(result).toEqual(accounts.filter((a) => a._id === account_id)[0]);
    });
  });

  describe('update', () => {
    it('THEN accountsService.update SHOULD be called with the provided id and updateAccountsDto', () => {
      jest.spyOn(accountsService, 'update');
      const account_id = '5f9d9b3b9d3b1d0b1c9d4401';
      const updateAccountsDto: UpdateAccountsDto = {
        balance: 100,
        updated_at: new Date(),
      };

      accountsController.update(account_id, updateAccountsDto);

      expect(accountsService.update).toHaveBeenCalledWith(account_id, updateAccountsDto);
    });
  });

  describe('remove', () => {
    it('should call accountsService.remove with the provided id', () => {
      jest.spyOn(accountsService, 'remove');
      const account_id = '5f9d9b3b9d3b1d0b1c9d4401';

      accountsController.remove(account_id);

      expect(accountsService.remove).toHaveBeenCalledWith(account_id);
    });
  });
});
