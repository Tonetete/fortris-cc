import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Account, AccountFieldsNames, ColumnTemplate, USDBTCPrice } from '@fortris-cc/types';
import { BreadcrumbService } from '../../breadcrumb/services/breadcrumb.service';
import { TrackerService } from '../../../services/tracker.service';

@Component({
  selector: 'fortris-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  USDBTCPriceSubscription: Subscription | null = null;
  btcUsdFormatColums: string[] = ['balance', 'available_balance'];
  dataSource: Account[] = [];
  columns: ColumnTemplate<Account>[] = [
    { name: 'account_name' },
    { name: 'category' },
    { name: 'tag' },
    { name: 'balance', template: 'btcUsdTemplate' },
    { name: 'available_balance', template: 'btcUsdTemplate' },
  ];
  displayedColumns: typeof AccountFieldsNames = {
    account_name: 'Account Name',
    category: 'Category',
    tag: 'Tags',
    balance: 'Balance',
    available_balance: 'Available Balance',
  };
  USDBTCPrice: USDBTCPrice | null = null;
  prueba: number = 0;

  constructor(
    private trackerService: TrackerService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((data) => {
      this.dataSource = data['accounts'] as Account[];
    });

    this.trackerService.getUSDBTCPriceMessage();
    this.USDBTCPriceSubscription = this.trackerService.USDBTCPrice$.subscribe((price: USDBTCPrice) => {
      this.USDBTCPrice = price;
    });

    this.breadcrumbService.buildBreacrumPathBasedInRouter(this.router);
  }

  rowClicked({ event, element }: { event: MouseEvent; element: Account }) {
    this.router.navigate(['account-detail', element._id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.USDBTCPriceSubscription?.unsubscribe();
  }
}
