import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Account, ColumnTemplate, USDBTCPrice } from '@fortris-cc/types';
import { TrackerService } from 'apps/client/src/app/services/tracker.service';
import { getAccounts } from '../../../../__mock__/accounts.mock';
import { SharedModule } from '../../../shared/shared.module';
import { TableModule } from '../../table.module';
import { TableComponent } from './table.component';
import { USDBTCPriceMock } from 'apps/client/src/app/__mock__/values.mock';
import { Observable, startWith } from 'rxjs';

class TrackerServiceMock {
  USDBTCPrice$ = new Observable<USDBTCPrice>().pipe(startWith(USDBTCPriceMock));
}

const accounts = getAccounts();

const btcUsdFormatColums = ['balance', 'available_balance'];
const columns: ColumnTemplate<Account>[] = [
  { name: 'account_name' },
  { name: 'category' },
  { name: 'tag' },
  { name: 'balance', template: 'btcUsdTemplate' },
  { name: 'available_balance', template: 'btcUsdTemplate' },
];
const displayedColumns: { [key: string]: string } = {
  account_name: 'Account Name',
  category: 'Category',
  tag: 'Tags',
  balance: 'Balance',
  available_balance: 'Available Balance',
};

describe('TableComponent', () => {
  let component: TableComponent<Account>;
  let fixture: ComponentFixture<TableComponent<Account>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        TableModule,
        SharedModule,
        BrowserAnimationsModule.withConfig({ disableAnimations: true }),
      ],
      providers: [{ provide: TrackerService, useClass: TrackerServiceMock }],
    });
    fixture = TestBed.createComponent(TableComponent) as ComponentFixture<
      TableComponent<Account>
    >;
    component = fixture.componentInstance;
    component.dataSource = accounts;
    component.btcUsdFormatColums = btcUsdFormatColums;
    component.columns = columns;
    component.displayedColumns = displayedColumns;

    fixture.detectChanges();
  });

  describe('WHEN on init', () => {
    it('THEN dataSource SHOULD be set', () => {
      const columnsName = columns.map((column) => column.name);

      expect(component.columnsName).toEqual(columnsName);
      expect(component.dataSource).toEqual(accounts);
      // expect(component.sortedData).toEqual(accounts);
    });
    // it('THEN if current USDBTCPrice is greater than previous changes SHOULD set rowBackgroundPriceStyleIncrease to true', () => {
    //   component.USDBTCPrice = {
    //     ...USDBTCPriceMock,
    //     rate_float: 2.345,
    //     rate: (2.345).toLocaleString('en-US', {
    //       style: 'currency',
    //       currency: 'USD',
    //     }),
    //   };

    //   const changes: SimpleChanges = {
    //     USDBTCPrice: new SimpleChange(
    //       USDBTCPriceMock, // previosValue
    //       { ...component.USDBTCPrice }, // currentValue
    //       false // isFirstChange
    //     ),
    //   };
    //   component.ngOnChanges(changes);

    //   expect(component.rowBackgroundPriceStyleIncrease).toBe(true);
    // });

    // it('THEN if current USDBTCPrice is lower than previous changes SHOULD set rowBackgroundPriceStyleIncrease to true', () => {
    //   component.USDBTCPrice = {
    //     ...USDBTCPriceMock,
    //     rate_float: 0.345,
    //     rate: (0.345).toLocaleString('en-US', {
    //       style: 'currency',
    //       currency: 'USD',
    //     }),
    //   };

    //   const changes: SimpleChanges = {
    //     USDBTCPrice: new SimpleChange(
    //       USDBTCPriceMock, // previosValue
    //       { ...component.USDBTCPrice }, // currentValue
    //       false // isFirstChange
    //     ),
    //   };
    //   component.ngOnChanges(changes);

    //   expect(component.rowBackgroundPriceStyleIncrease).toBe(false);
    // });

    // it('THEN should flush setTimeout and set rowBackgroundPriceStyleIncrease to null', fakeAsync(() => {
    //   component.USDBTCPrice = {
    //     ...USDBTCPriceMock,
    //     rate_float: 35.345,
    //     rate: '$35,345',
    //   };

    //   const changes: SimpleChanges = {
    //     USDBTCPrice: new SimpleChange(
    //       USDBTCPriceMock, // previosValue
    //       { ...component.USDBTCPrice }, // currentValue
    //       false // isFirstChange
    //     ),
    //   };
    //   component.ngOnChanges(changes);

    //   expect(component.rowBackgroundPriceStyleIncrease).toBe(true); // Assuming it's set to true

    //   tick(DELAY_BACKGROUND_COLOR_CHANGE);

    //   // After the timeout is flushed, the rowBackgroundPriceStyleIncrease should be set back to null
    //   expect(component.rowBackgroundPriceStyleIncrease).toBeNull();
    // }));
  });
  describe('WHEN on changes', () => {
    it('THEN sortedData SHOULD be set', () => {
      const changes = {
        dataSource: {
          previousValue: [],
          currentValue: accounts,
          firstChange: false,
          isFirstChange: () => false,
        },
      };
      component.ngOnChanges(changes);

      expect(component.sortedData).toEqual(accounts);
    });
  });

  describe('WHEN call sortData', () => {
    it('THEN table data SHOULD be sorted according to column selected', () => {
      const changes = {
        dataSource: {
          previousValue: [],
          currentValue: accounts,
          firstChange: false,
          isFirstChange: () => false,
        },
      };
      component.ngOnChanges(changes);

      const matSortHeaders = fixture.nativeElement.querySelectorAll(
        '.mat-sort-header-container'
      );

      const matSortHeader = matSortHeaders[0];
      matSortHeader.click();
      matSortHeader.click();

      fixture.detectChanges();

      expect(component.sortedData[0].account_name).toEqual(accounts[accounts.length - 1].account_name);
      expect(component.sortedData[1].account_name).toEqual(accounts[accounts.length - 2].account_name);
      expect(component.sortedData[2].account_name).toEqual(accounts[accounts.length - 3].account_name);
    });
  });
});
