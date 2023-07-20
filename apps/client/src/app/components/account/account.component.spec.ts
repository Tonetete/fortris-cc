import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  convertToParamMap,
} from '@angular/router';
import { Account, USDBTCPrice } from '@fortris-cc/types';
import { Observable, ReplaySubject, startWith } from 'rxjs';
import { getAccounts } from '../../../app/__mock__/accounts.mock';
import { BtcToUsdFormatPipe } from '../../pipes/btc-to-usd-format.pipe';
import { AccountService } from '../../services/account.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { TrackerService } from '../../services/tracker.service';
import { TableComponent } from '../table/table.component';
import { AccountComponent } from './account.component';

const accounts = getAccounts();
const USDBTCPriceMock = {
  rate_float: 1.234,
  code: 'USD',
  description: 'USD price of bitcoin',
  rate: (1.234).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  }),
};

const eventSubject = new ReplaySubject<RouterEvent>();

const routerMock = {
  navigate: jest.fn(),
  events: eventSubject.asObservable(),
  url: '/accounts',
};

class MockActivatedRoute {
  snapshot = {
    paramMap: convertToParamMap({ id: '1' }),
  };
}

class AccountServiceMock {
  accountBehaviourSubject$ = new Observable<Account>().pipe(
    startWith(accounts)
  );
}

class TrackerServiceMock {
  USDBTCPrice$ = new Observable<USDBTCPrice>().pipe(startWith(USDBTCPriceMock));
}

class BreadcrumbServiceMock {
  setBreadcrumbPath() {}
}

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let breadcrumbService: BreadcrumbService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent, TableComponent, BtcToUsdFormatPipe],
      imports: [
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule.withConfig({ disableAnimations: true }),
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: AccountService, useClass: AccountServiceMock },
        { provide: TrackerService, useClass: TrackerServiceMock },
        { provide: BreadcrumbService, useClass: BreadcrumbServiceMock },
      ],
    });
    fixture = TestBed.createComponent(AccountComponent);
    router = TestBed.inject(Router);
    breadcrumbService = TestBed.inject(BreadcrumbService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('WHEN on init', () => {
    it('THEN values must be set', () => {
      expect(component).toBeTruthy();
      expect(component.dataSource).toEqual(accounts);
      expect(component.USDBTCPrice?.code).toBe(USDBTCPriceMock.code);
      expect(component.USDBTCPrice?.description).toBe(
        USDBTCPriceMock.description
      );
      expect(component.USDBTCPrice?.rate).toBe(USDBTCPriceMock.rate);
      expect(component.USDBTCPrice?.rate_float).toBe(
        USDBTCPriceMock.rate_float
      );
    });

    it('THEN router events SHOULD pass url and router to breadcrumb service', () => {
      const urlAfterRedirects = '/accounts';
      const navigationEndEvent = new NavigationEnd(
        1,
        urlAfterRedirects,
        urlAfterRedirects
      );

      jest.spyOn(breadcrumbService, 'setBreadcrumbPath');
      eventSubject.next(navigationEndEvent);

      expect(breadcrumbService.setBreadcrumbPath).toHaveBeenCalledWith(
        urlAfterRedirects,
        router
      );
    });
  });

  describe('WHEN on click row', () => {
    it('THEN row account id SHOULD navigate to account-detail section', () => {
      const firstRow = fixture.nativeElement.querySelectorAll('tr')[1];
      firstRow.click();

      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
