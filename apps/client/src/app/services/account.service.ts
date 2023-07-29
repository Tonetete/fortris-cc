import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Account, Transaction } from '@fortris-cc/types';
import { Observable, map } from 'rxjs';
import { getAccountsBaseUrl, getTransactionsUrlByAccountId } from '../api/urls';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { 
    this.fetchAccounts();
  }

  fetchAccounts(): Observable<Account[]> {
    return this.http
      .get<Account[]>(getAccountsBaseUrl())
      .pipe(map((accounts) => accounts));
  }

  fetchTransactionsByAccountId$(account_id: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(getTransactionsUrlByAccountId(account_id)).pipe(
      map((transactions) => transactions)
    );
  }

}
