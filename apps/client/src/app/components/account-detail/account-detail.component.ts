import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  Account,
  ColumnTemplate,
  Transaction,
  USDBTCPrice,
} from '@fortris-cc/types';
import { combineLatest, filter } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'fortris-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent {
  account: Account | undefined;
  dataSource: Transaction[] = [];
  columns: ColumnTemplate<Transaction>[] = [
    { name: 'created_at', template: 'dateTemplate' },
    { name: 'order_id' },
    { name: 'order_code' },
    { name: 'transaction_type' },
    { name: 'debit', template: 'btcUsdTemplate' },
    { name: 'credit', template: 'btcUsdTemplate' },
    { name: 'balance', template: 'btcUsdTemplate' },
  ];
  displayedColumns: { [key: string]: string } = {
    created_at: 'Confirmed Date',
    order_id: 'Order ID',
    order_code: 'Order Code',
    transaction_type: 'Transaction Type',
    debit: 'Debit',
    credit: 'Credit',
    balance: 'Balance',
  };
  USDBTCPrice: USDBTCPrice | null = null;
  rowBackgroundPriceStyleIncrease: boolean | null = true;

  constructor(
    private accountService: AccountService,
    private trackerService: TrackerService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.accountService
        .fetchTransactionsByAccountId$(params['id'])
        .subscribe((transactions) => {
          this.dataSource = transactions;
        });
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const { url } = event as NavigationEnd;
        this.breadcrumbService.setBreadcrumbPath(url, this.router);
      });
  }

  ngOnInit() {
    this.trackerService.getUSDBTCPriceMessage();
    this.trackerService.USDBTCPrice$.subscribe((price: USDBTCPrice) => {
      this.USDBTCPrice = price;
    });
  }

  ngOnDestroy() {
    this.accountService.clear();
  }
}
