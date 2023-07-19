import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Account, AccountDisplayColumns, USDBTCPrice } from '@fortris-cc/types';
import { AccountService } from '../../services/account.service';
import { TrackerService } from '../../services/tracker.service';
import { filter } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb.service';

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
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.trackerService.USDBTCPrice$.subscribe((price) => {
      this.USDBTCPrice = price;
    });
    this.accountService.accountBehaviourSubject$.subscribe((accounts) => {
      this.dataSource = accounts;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const { urlAfterRedirects } = event as NavigationEnd;
        this.breadcrumbService.setBreadcrumbPath(urlAfterRedirects, this.router);
      });
  }

  rowClicked(event: MouseEvent) {
    const tr = (event?.target as Element)?.closest('tr');
    const account_id = tr?.getAttribute('data-id');
    this.router.navigate(['account-detail', account_id], {
      relativeTo: this.route,
    });
  }
}
