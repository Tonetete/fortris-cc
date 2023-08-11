import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { getAccounts } from '../__mock__/accounts.mock';
import { getTransactions } from '../__mock__/transactions.mock';
import {
  getAccountUrlById,
  getAccountsBaseUrl,
  getTransactionsUrlByAccountId,
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
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('WHEN fetchAccounts', () => {
    it('THEN accounts SHOULD be returned', (done) => {
      service.fetchAccounts$().subscribe((data) => {
        expect(data).toEqual(accounts);
        done();
      });

      const req = httpTestingController.expectOne(getAccountsBaseUrl());
      expect(req.request.method).toEqual('GET');
      req.flush(accounts);
    });
  });

  describe('WHEN fetchAccountById', () => {
    it('THEN account by id SHOULD be returned', (done) => {
      const { _id } = accounts[0];
      service.fetchAccountById$(_id as string).subscribe((data) => {
        expect(data).toEqual(accounts[0]);
        done();
      });

      const req = httpTestingController.expectOne(
        getAccountUrlById(_id as string)
      );
      expect(req.request.method).toEqual('GET');
      req.flush(accounts[0]);
    });
  });

  describe('WHEN fetchTransactionsByAccountId', () => {
    it('THEN all transaction for a given account id by id SHOULD be returned', (done) => {
      const { _id } = accounts[0];
      const transactionsByAccountId = transactions.filter(
        (t) => t.account_id === _id
      );

      service
        .fetchTransactionsByAccountId$(_id as string)
        .subscribe((data) => {
          expect(data).toEqual(transactionsByAccountId);
          done();
        });

      const req = httpTestingController.expectOne(
        getTransactionsUrlByAccountId(_id as string)
      );
      expect(req.request.method).toEqual('GET');
      req.flush(transactionsByAccountId);
    });
  });
});
