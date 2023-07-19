import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account, Transaction } from '@fortris-cc/types';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { getAccountsBaseUrl, getTransactionsUrlByAccountId } from '../api/urls';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly _accountBehaviourSubject: BehaviorSubject<Account[]> =
    new BehaviorSubject<Account[]>([]);
  readonly accountBehaviourSubject$ = this._accountBehaviourSubject
    .asObservable()
    .pipe(filter((value) => !!value));
  
  private readonly _transactionsBehaviourSubject: BehaviorSubject<Transaction[]> =
    new BehaviorSubject<Transaction[]>([]);
  readonly transactionsBehaviourSubject$ = this._transactionsBehaviourSubject
    .asObservable()
    .pipe(filter((value) => !!value));
    
  constructor(private http: HttpClient) { 
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.http.get<Account[]>(getAccountsBaseUrl()).subscribe((accounts) => {
      this._accountBehaviourSubject.next(accounts);
    });
  }

  fetchTransactionsByAccountId(account_id: string) {
    this.http.get<Transaction[]>(getTransactionsUrlByAccountId(account_id)).subscribe((transactions) => {
      this._transactionsBehaviourSubject.next(transactions);
    });
  }

  getAccountById$(account_id: string): Observable<Account | undefined> {
    return this.accountBehaviourSubject$.pipe(
      map((accounts) => accounts.find((account) => account._id === account_id))
    );
  }

  getTransactionsByAccountId$(account_id: string): Observable<Transaction[]> {
    this.fetchTransactionsByAccountId(account_id);
    return this.transactionsBehaviourSubject$;
  }

  clear() {
    this._transactionsBehaviourSubject.next([]);
  }

}
