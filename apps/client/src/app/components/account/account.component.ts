import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account, AccountDisplayColumns, USDBTCPrice } from '@fortris-cc/types';
import { AccountService } from '../../services/account.service';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'fortris-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  btcUsdFormatColums: string[] = ['balance', 'available_balance'];
  dataSource: Account[] = [];
  columns: Array<keyof Account> = [
    'account_name',
    'category',
    'tag',
    'balance',
    'available_balance',
  ];
  displayedColumns: { [key in keyof AccountDisplayColumns]: string } = {
    account_name: 'Account Name',
    category: 'Category',
    tag: 'Tags',
    balance: 'Balance',
    available_balance: 'Available Balance',
  };
  USDBTCPrice: USDBTCPrice | null = null;

  constructor(
    private accountService: AccountService,
    private trackerService: TrackerService,
    private router: Router
  ) {
    this.trackerService.USDBTCPrice$.subscribe((price) => {
      this.USDBTCPrice = price;
    });
    this.accountService.accountBehaviourSubject$.subscribe((accounts) => {
      this.dataSource = accounts;
    });
  }

  rowClicked(event: MouseEvent) {
    const tr = (event?.target as Element)?.closest('tr');
    const account_id = tr?.getAttribute('data-id');
    this.router.navigate(['account-detail', account_id]);
  }
}
