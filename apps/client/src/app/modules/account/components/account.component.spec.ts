import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { Account, USDBTCPrice } from '@fortris-cc/types';
import { Observable, Subscription, startWith } from 'rxjs';
import { USDBTCPriceMock } from '../../../__mock__/values.mock';
import { getAccounts } from '../../../__mock__/accounts.mock';
import { TrackerService } from '../../../services/tracker.service';
import { BreadcrumbService } from '../../breadcrumb/services/breadcrumb.service';
import { SharedModule } from '../../shared/shared.module';
import { TableModule } from '../../table/table.module';
import { AccountComponent } from './account.component';

const accounts = getAccounts();

class MockActivatedRoute {
  snapshot = {
    paramMap: convertToParamMap({ id: '1' }),
  };

  data = new Observable<{ accounts: Account[] }>(
    (observer) => observer.next({ accounts }) // this is the mock
  );
}

class TrackerServiceMock {
  USDBTCPrice$ = new Observable<USDBTCPrice>().pipe(startWith(USDBTCPriceMock));
}

class BreadcrumbServiceMock {
  buildBreacrumPathBasedInRouter(router: Router) {}
}

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let breadcrumbService: BreadcrumbService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        TableModule,
        SharedModule,
        BrowserAnimationsModule.withConfig({ disableAnimations: true }),
      ],
      providers: [
        { provide: Router },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: TrackerService, useClass: TrackerServiceMock },
        { provide: BreadcrumbService, useClass: BreadcrumbServiceMock },
      ],
    });
    router = TestBed.inject(Router);
    breadcrumbService = TestBed.inject(BreadcrumbService);
    jest.spyOn(breadcrumbService, 'buildBreacrumPathBasedInRouter');

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {});

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
      expect(
        breadcrumbService.buildBreacrumPathBasedInRouter
      ).toHaveBeenCalledWith(router);
    });
  });

  describe('WHEN on click row', () => {
    it('THEN row account id SHOULD navigate to account-detail section', () => {
      jest.spyOn(router, 'navigate');
      const firstRow = fixture.nativeElement.querySelectorAll('tr')[1];
      firstRow.click();

      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('WHEN on destroy', () => {
    it('THEN subscriptions SHOULD be unsubscribed', () => {
      jest.spyOn(component['USDBTCPriceSubscription'] as Subscription, 'unsubscribe');
      component.ngOnDestroy();  
      expect(component.USDBTCPriceSubscription?.unsubscribe).toHaveBeenCalled();
    });
  });
});
