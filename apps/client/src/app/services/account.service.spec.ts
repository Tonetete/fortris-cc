import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { getAccounts } from '../__mock__/accounts.mock';
import { getTransactions } from '../__mock__/transactions.mock';
import {
  getAccountsBaseUrl,
  getTransactionsUrlByAccountId
} from '../api/urls';
import { AccountService } from './account.service';

const accounts = getAccounts();
const transactions = getTransactions();

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('WHEN fetchAccounts', () => {
    it('THEN accounts SHOULD be returned', () => {

      const req = httpTestingController.expectOne(getAccountsBaseUrl());
      expect(req.request.method).toEqual('GET');

      req.flush(accounts);
    });
  });

  describe('WHEN fetchAccountById', () => {
    it('THEN account by id SHOULD be returned', () => {
      const req = httpTestingController.expectOne(getAccountsBaseUrl());
      expect(req.request.method).toEqual('GET');

      req.flush(accounts);
    });
  });

  describe('WHEN fetchTransactionsByAccountId', () => {
    it('THEN all transaction for a given account id by id SHOULD be returned', (done) => {

      const transactionsByAccountId = transactions.filter(
        (t) => t.account_id === accounts[0]._id
      );

      const req = httpTestingController.expectOne(getAccountsBaseUrl());
      expect(req.request.method).toEqual('GET');

      req.flush(accounts);
      
      const req2 = httpTestingController.expectOne(
        getTransactionsUrlByAccountId(accounts[0]._id as string)
      );
      expect(req2.request.method).toEqual('GET');

    });
  });
});
