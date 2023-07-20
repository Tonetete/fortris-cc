import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailComponent } from './account-detail.component';
import { Account, USDBTCPrice } from '@fortris-cc/types';
import { Observable, ReplaySubject, of, startWith } from 'rxjs';
import { getAccounts } from '../../__mock__/accounts.mock';
import { getTransactions } from '../../__mock__/transactions.mock';
import {
  Router,
  ActivatedRoute,
  RouterEvent,
  convertToParamMap,
  NavigationEnd,
} from '@angular/router';
import { AccountService } from '../../services/account.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { TrackerService } from '../../services/tracker.service';
import { BtcToUsdFormatPipe } from '../../pipes/btc-to-usd-format.pipe';
import { TableComponent } from '../table/table.component';
import { MatTableModule } from '@angular/material/table';

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

  getAccountById$() {
    return of(accounts[0]);
  }

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
  setBreadcrumbPath() {}
}

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;
  let breadcrumbService: BreadcrumbService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountDetailComponent,
        BtcToUsdFormatPipe,
        TableComponent,
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: AccountService, useClass: AccountServiceMock },
        { provide: TrackerService, useClass: TrackerServiceMock },
        { provide: BreadcrumbService, useClass: BreadcrumbServiceMock },
      ],
      imports: [MatTableModule],
    });
    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    breadcrumbService = TestBed.inject(BreadcrumbService);
    fixture.detectChanges();
  });

  describe('WHEN on init', () => {
    it('THEN values must be set', () => {
      const urlAfterRedirects = '/accounts/account-detail/1';
      const { _id } = accounts[0];
      const transactionsById = transactions.filter(
        (t) => t.account_id === _id
      );
      const navigationEndEvent = new NavigationEnd(
        1,
        urlAfterRedirects,
        urlAfterRedirects
      );
      jest.spyOn(breadcrumbService, 'setBreadcrumbPath');
      
      paramsSubject.next({ id: _id as string });
      eventSubject.next(navigationEndEvent);

      
      expect(component).toBeTruthy();
      expect(component.account).toEqual(accounts[0]);
      expect(component.dataSource).toEqual(transactionsById);
      expect(breadcrumbService.setBreadcrumbPath).toHaveBeenCalledWith(
        urlAfterRedirects,
        router
      );
    });
  });
});
