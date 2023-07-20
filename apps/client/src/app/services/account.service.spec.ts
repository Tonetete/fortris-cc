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
      jest.spyOn(service['_accountBehaviourSubject'], 'next');

      const req = httpTestingController.expectOne(getAccountsBaseUrl());
      expect(req.request.method).toEqual('GET');

      req.flush(accounts);

      expect(service['_accountBehaviourSubject'].next).toHaveBeenCalledWith(
        accounts
      );
    });
  });

  describe('WHEN fetchAccountById', () => {
    it('THEN account by id SHOULD be returned', (done) => {
      const req = httpTestingController.expectOne(getAccountsBaseUrl());
      expect(req.request.method).toEqual('GET');

      req.flush(accounts);

      service
        .getAccountById$(accounts[0]._id as string)
        .subscribe((account) => {
          expect(account).toEqual(accounts[0]);
          done();
        });
    });
  });

  describe('WHEN fetchTransactionsByAccountId', () => {
    it('THEN all transaction for a given account id by id SHOULD be returned', (done) => {
      jest.spyOn(service['_transactionsBehaviourSubject'], 'next');

      const transactionsByAccountId = transactions.filter(
        (t) => t.account_id === accounts[0]._id
      );

      const req = httpTestingController.expectOne(getAccountsBaseUrl());
      expect(req.request.method).toEqual('GET');

      req.flush(accounts);

      service.fetchTransactionsByAccountId(accounts[0]._id as string);
      
      const req2 = httpTestingController.expectOne(
        getTransactionsUrlByAccountId(accounts[0]._id as string)
      );
      expect(req2.request.method).toEqual('GET');

      req2.flush(transactionsByAccountId);

      service
        .getTransactionsByAccountId$(accounts[0]._id as string)
        .subscribe((transactions) => {
          expect(transactions).toEqual(transactionsByAccountId);
          done();
        });

      expect(
        service['_transactionsBehaviourSubject'].next
      ).toHaveBeenCalledWith(transactionsByAccountId);
    });
  });
  
  describe('WHEN fetchTransactionsByAccountId', () => {
    it('THEN all transaction for a given account id by id SHOULD be returned', () => {
      jest.spyOn(service['_transactionsBehaviourSubject'], 'next');

      service.clear();

      expect(
        service['_transactionsBehaviourSubject'].next
      ).toHaveBeenCalledWith([]);
    });
  });
});
