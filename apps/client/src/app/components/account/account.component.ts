import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account, USDBTCPrice } from '@fortris-cc/types';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'fotris-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  dataSource: Account[] = [];
  columns: Array<keyof Account> = [
    'account_name',
    'category',
    'tag',
    'balance',
    'available_balance',
  ];
  displayedColumns: { [key in keyof Account]: string } = {
    account_name: 'Account Name',
    category: 'Category',
    tag: 'Tags',
    balance: 'Balance',
    available_balance: 'Available Balance',
  };

  constructor(
    private accountService: AccountService,
    private router: Router
    this.accountService.accountBehaviourSubject$.subscribe((accounts) => {
      this.dataSource = accounts;
    });
  }
