import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { getAccounts } from '../../__mock__/accounts.mock';
import { Account, AccountDisplayColumns } from '@fortris-cc/types';
import { NgZone, SimpleChange, SimpleChanges } from '@angular/core';
import { BtcToUsdFormatPipe } from '../../pipes/btc-to-usd-format.pipe';
import { DELAY_BACKGROUND_COLOR_CHANGE } from '@fortris-cc/constants';

type T = { [key: string]: unknown };

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
const btcUsdFormatColums = ['balance', 'available_balance'];
const columns: Array<keyof Account> = [
  'account_name',
  'category',
  'tag',
  'balance',
  'available_balance',
];
const displayedColumns: { [key in keyof AccountDisplayColumns]: string } = {
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
      declarations: [TableComponent, BtcToUsdFormatPipe],
      imports: [MatTableModule],
    });
    fixture = TestBed.createComponent(TableComponent) as ComponentFixture<
      TableComponent<Account>
    >;
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.dataSource = accounts;
    component.USDBTCPrice = USDBTCPriceMock;
    component.btcUsdFormatColums = btcUsdFormatColums;
    component.columns = columns;
    component.displayedColumns = displayedColumns;
  });

  describe('WHEN on changes', () => {
    it('THEN if current USDBTCPrice is greater than previous changes SHOULD set rowBackgroundPriceStyleIncrease to true', () => {
      component.USDBTCPrice = {
        ...USDBTCPriceMock,
        rate_float: 2.345,
        rate: (2.345).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
      };

      const changes: SimpleChanges = {
        USDBTCPrice: new SimpleChange(
          USDBTCPriceMock, // previosValue
          { ...component.USDBTCPrice }, // currentValue
          false // isFirstChange
        ),
      };
      component.ngOnChanges(changes);

      expect(component.rowBackgroundPriceStyleIncrease).toBe(true);
    });
    
    it('THEN if current USDBTCPrice is lower than previous changes SHOULD set rowBackgroundPriceStyleIncrease to true', () => {
      component.USDBTCPrice = {
        ...USDBTCPriceMock,
        rate_float: 0.345,
        rate: (0.345).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
      };

      const changes: SimpleChanges = {
        USDBTCPrice: new SimpleChange(
          USDBTCPriceMock, // previosValue
          { ...component.USDBTCPrice }, // currentValue
          false // isFirstChange
        ),
      };
      component.ngOnChanges(changes);

      expect(component.rowBackgroundPriceStyleIncrease).toBe(false);
    });

    it('THEN should flush setTimeout and set rowBackgroundPriceStyleIncrease to null', fakeAsync(() => {
      component.USDBTCPrice = {
        ...USDBTCPriceMock,
        rate_float: 35.345,
        rate: '$35,345',
      };
  
      const changes: SimpleChanges = {
        USDBTCPrice: new SimpleChange(
          USDBTCPriceMock, // previosValue
          { ...component.USDBTCPrice }, // currentValue
          false // isFirstChange
        ),
      };
      component.ngOnChanges(changes);
  
      expect(component.rowBackgroundPriceStyleIncrease).toBe(true); // Assuming it's set to true

      tick(DELAY_BACKGROUND_COLOR_CHANGE);
  
      // After the timeout is flushed, the rowBackgroundPriceStyleIncrease should be set back to null
      expect(component.rowBackgroundPriceStyleIncrease).toBeNull();
    }));
  });
});
