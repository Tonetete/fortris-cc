import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Transaction, TransactionDisplayColumns, USDBTCPrice } from '@fortris-cc/types';
import { combineLatest, filter } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { TrackerService } from '../../services/tracker.service';
import { DELAY_BACKGROUND_COLOR_CHANGE } from '@fortris-cc/constants';

@Component({
  selector: 'fortris-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent {
  account: Account | undefined;
  dataSource: Transaction[] = [];
  btcUsdFormatColums: string[] = ['credit', 'balance'];
  columns: Array<keyof Transaction> = [
    'created_at', 
    'order_id',
    'order_code',
    'transaction_type',
    'debit',
    'credit',
    'balance',
  ];
  displayedColumns: { [key in keyof TransactionDisplayColumns]: string } = {
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
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      combineLatest({
        getAccountById: this.accountService.getAccountById$(params['id']),
        getTransactionsByAccountId:
          this.accountService.getTransactionsByAccountId$(params['id']),
      })
        .pipe(
          filter(
            ({ getAccountById, getTransactionsByAccountId }) =>
              !!getAccountById && getTransactionsByAccountId.length > 0
          )
        )
        .subscribe(({ getAccountById, getTransactionsByAccountId }) => {
          this.account = getAccountById;
          this.dataSource = getTransactionsByAccountId;
        });
    });
  }

  ngOnInit() {
    this.trackerService.getUSDBTCPriceMessage();
    this.trackerService.USDBTCPrice$.subscribe((price: USDBTCPrice) => {
      const { rate_float } = price;
      const { rate_float: oldRate_float } = this.USDBTCPrice || {};
      
      if (rate_float !== oldRate_float) {
        this.rowBackgroundPriceStyleIncrease = (rate_float || 0) > (oldRate_float || 0);
      }

      this.USDBTCPrice = price;
    });
  }
}
