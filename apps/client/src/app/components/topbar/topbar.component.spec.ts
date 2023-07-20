import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { USDBTCPrice } from '@fortris-cc/types';
import { Observable, startWith } from 'rxjs';
import { TrackerService } from '../../services/tracker.service';
import { MatIconModule } from '@angular/material/icon';
import { BtcToUsdFormatPipe } from '../../pipes/btc-to-usd-format.pipe';

const USDBTCPriceMock = {
  rate_float: 1.234,
  code: 'USD',
  description: 'USD price of bitcoin',
  rate: (1.234).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  }),
};

class TrackerServiceMock {
  USDBTCPrice$ = new Observable<USDBTCPrice>().pipe(startWith(USDBTCPriceMock));
  getUSDBTCPriceMessage() {}
}

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [TopbarComponent, BtcToUsdFormatPipe],
      providers: [{ provide: TrackerService, useClass: TrackerServiceMock }],
    });
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('WHEN on init', () => {
    it('THEN values SHOULD be set', () => {
      
      const spanBTCPrice = fixture.nativeElement.querySelector('span');
      
      expect(component).toBeTruthy();
      expect(spanBTCPrice.textContent).toBe(USDBTCPriceMock.rate);

    });
  });
});
