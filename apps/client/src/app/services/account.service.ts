import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from '@fortris-cc/types';
import { BehaviorSubject, filter } from 'rxjs';
import { getAccountsBaseUrl } from '../api/urls';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly _accountBehaviourSubject: BehaviorSubject<Account[]> =
    new BehaviorSubject<Account[]>([]);
  readonly accountBehaviourSubject$ = this._accountBehaviourSubject
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

}
