import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Account, ColumnTemplate, USDBTCPrice } from '@fortris-cc/types';
import { filter } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'fortris-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  btcUsdFormatColums: string[] = ['balance', 'available_balance'];
  dataSource: Account[] = [];
  columns: ColumnTemplate<Account>[] = [
    { name: 'account_name' },
    { name: 'category' },
    { name: 'tag' },
    { name: 'balance', template: 'btcUsdTemplate' },
    { name: 'available_balance', template: 'btcUsdTemplate' },
  ];
  displayedColumns: { [key: string]: string } = {
    account_name: 'Account Name',
    category: 'Category',
    tag: 'Tags',
    balance: 'Balance',
    available_balance: 'Available Balance',
  };
  USDBTCPrice: USDBTCPrice | null = null;

  constructor(
    private trackerService: TrackerService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((data) => {
      this.dataSource = data['accounts'] as Account[];
    });

    this.trackerService.USDBTCPrice$.subscribe((price) => {
      this.USDBTCPrice = price;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const { urlAfterRedirects } = event as NavigationEnd;
        this.breadcrumbService.setBreadcrumbPath(
          urlAfterRedirects,
          this.router
        );
      });
  }

  rowClicked({ event, element }: { event: MouseEvent; element: Account }) {
    this.router.navigate(['account-detail', element._id], {
      relativeTo: this.route,
    });
  }
}
