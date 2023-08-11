import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtcUsdCellTemplateComponent } from './btc-usd-cell-template.component';
import { TrackerService } from '../../../../services/tracker.service';
import { USDBTCPrice } from '@fortris-cc/types';
import { Observable, startWith } from 'rxjs';
import { USDBTCPriceMock } from '../../../../__mock__/values.mock';
import { SharedModule } from '../../../shared/shared.module';

class TrackerServiceMock {
  USDBTCPrice$ = new Observable<USDBTCPrice>().pipe(startWith(USDBTCPriceMock));
}

describe('BtcUsdCellTemplateComponent', () => {
  let component: BtcUsdCellTemplateComponent;
  let fixture: ComponentFixture<BtcUsdCellTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [BtcUsdCellTemplateComponent, SharedModule],
      providers: [{ provide: TrackerService, useClass: TrackerServiceMock }],
    });
    fixture = TestBed.createComponent(BtcUsdCellTemplateComponent);
    component = fixture.componentInstance;
    component.element = 10;
    fixture.detectChanges();
  });

  describe('WHEN on init', () => {
    it('THEN btc usd template SHOULD be rendered correctly', () => {
      const spans = fixture.nativeElement.querySelectorAll('span');
      
      expect(spans[0].textContent).toBe('10.000000 BTC');
      expect(spans[1].textContent).toBe('$12.34');
    });
  });
});
