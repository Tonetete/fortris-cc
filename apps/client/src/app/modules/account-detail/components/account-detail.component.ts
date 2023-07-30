import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Account,
  ColumnTemplate,
  Transaction,
  USDBTCPrice,
} from '@fortris-cc/types';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../breadcrumb/services/breadcrumb.service';
import { TrackerService } from '../../../services/tracker.service';

@Component({
  selector: 'fortris-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent {
  USDBTCPriceSubscription: Subscription | null = null;
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
    private trackerService: TrackerService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    
    this.route.data.subscribe((data) => {
      this.dataSource = data['transactions'] as Transaction[];
    });

    this.breadcrumbService.buildBreacrumPathBasedInRouter(this.router);
  }

  ngOnInit() {
    this.trackerService.getUSDBTCPriceMessage();
    this.trackerService.USDBTCPrice$.subscribe((price: USDBTCPrice) => {
      this.USDBTCPrice = price;
    });
  }

  ngOnDestroy() {
    this.USDBTCPriceSubscription?.unsubscribe();
  }
}
