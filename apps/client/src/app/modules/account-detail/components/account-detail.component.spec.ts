import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  convertToParamMap,
} from '@angular/router';
import { Account, Transaction, USDBTCPrice } from '@fortris-cc/types';
import { Observable, ReplaySubject, Subscription, of, startWith } from 'rxjs';
import { getAccounts } from '../../../__mock__/accounts.mock';
import { getTransactions } from '../../../__mock__/transactions.mock';
import { BtcToUsdFormatPipe } from '../../../pipes/btc-to-usd-format.pipe';
import { AccountService } from '../../../services/account.service';
import { BreadcrumbService } from '../../breadcrumb/services/breadcrumb.service';
import { TrackerService } from '../../../services/tracker.service';
import { TableComponent } from '../../table/components/table/table.component';
import { AccountDetailComponent } from './account-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from '../../table/table.module';
import { SharedModule } from '../../shared/shared.module';

const accounts = getAccounts();
const transactions = getTransactions();
const eventSubject = new ReplaySubject<RouterEvent>();
const paramsSubject = new ReplaySubject<{ id: string }>();

const routerMock = {
  navigate: jest.fn(),
  events: eventSubject.asObservable(),
  url: '/accounts/account-detail/1',
};
class MockActivatedRoute {
  snapshot = {
    paramMap: convertToParamMap({ id: '1' }),
  };
  params = paramsSubject.asObservable();
  data = new Observable<{ account: Account; transactions: Transaction[] }>(
    (observer) =>
      observer.next({
        account: { ...accounts[0] },
        transactions: transactions.filter(
          (t) => t.account_id === accounts[0]._id
        ),
      }) // this is the mock
  );
}

const USDBTCPriceMock = {
  rate_float: 1.234,
  code: 'USD',
  description: 'USD price of bitcoin',
  rate: (1.234).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  }),
};

class AccountServiceMock {
  accountBehaviourSubject$ = new Observable<Account>().pipe(
    startWith(accounts)
  );

  getTransactionsByAccountId$(account_id: string) {
    return of(transactions.filter((t) => t.account_id === account_id));
  }

  clear() {}
}

class TrackerServiceMock {
  USDBTCPrice$ = new Observable<USDBTCPrice>().pipe(startWith(USDBTCPriceMock));
  getUSDBTCPriceMessage() {}
}

class BreadcrumbServiceMock {
  buildBreacrumPathBasedInRouter(router: Router) {}
}

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;
  let breadcrumbService: BreadcrumbService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDetailComponent],
      providers: [
        { provide: Router },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: AccountService, useClass: AccountServiceMock },
        { provide: TrackerService, useClass: TrackerServiceMock },
        { provide: BreadcrumbService, useClass: BreadcrumbServiceMock },
      ],
      imports: [
        TableModule,
        SharedModule,
        BrowserAnimationsModule.withConfig({ disableAnimations: true }),
      ],
    });
    router = TestBed.inject(Router);
    breadcrumbService = TestBed.inject(BreadcrumbService);
    jest.spyOn(breadcrumbService, 'buildBreacrumPathBasedInRouter');

    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('WHEN on init', () => {
    it('THEN values must be set', () => {
      const urlAfterRedirects = '/accounts/account-detail/1';
      const { _id } = accounts[0];
      const transactionsById = transactions.filter((t) => t.account_id === _id);
      const navigationEndEvent = new NavigationEnd(
        1,
        urlAfterRedirects,
        urlAfterRedirects
      );

      paramsSubject.next({ id: _id as string });
      eventSubject.next(navigationEndEvent);

      expect(component).toBeTruthy();
      expect(component.account).toEqual(accounts[0]);
      expect(component.dataSource).toEqual(transactionsById);
      expect(
        breadcrumbService.buildBreacrumPathBasedInRouter
      ).toHaveBeenCalledWith(router);
    });
  });

  describe('WHEN on destroy', () => {
    it('THEN subscriptions SHOULD be unsubscribed', () => {
      jest.spyOn(
        component['USDBTCPriceSubscription'] as Subscription,
        'unsubscribe'
      );
      component.ngOnDestroy();
      expect(component.USDBTCPriceSubscription?.unsubscribe).toHaveBeenCalled();
    });
  });
});
