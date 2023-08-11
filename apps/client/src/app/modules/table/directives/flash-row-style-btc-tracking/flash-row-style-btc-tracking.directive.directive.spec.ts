import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { FlashRowStyleBTCTrackingDirective } from './flash-row-style-btc-tracking.directive';
import { USDBTCPriceMock } from 'apps/client/src/app/__mock__/values.mock';
import { USDBTCPrice } from '@fortris-cc/types';
import { DELAY_BACKGROUND_COLOR_CHANGE } from '@fortris-cc/constants';

@Component({
  selector: 'fortris-test-component',
  template: `<div fortrisFlashRowStyleBTCTracking [USDBTCPrice]="USDBTCPrice">
    <table>
      <tbody>
        <tr>
          Row 1
        </tr>
        <tr>
          Row 2
        </tr>
        <tr>
          Row 3
        </tr>
      </tbody>
    </table>
  </div>`,
})
class TestComponent {
  @Input() USDBTCPrice: USDBTCPrice | null = null;

  constructor() {}
}

describe('FlashRowStyleBTCTrackingDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;

  beforeEach(() => {
    // jest.useFakeTimers();
    TestBed.configureTestingModule({
      declarations: [TestComponent, FlashRowStyleBTCTrackingDirective],
    });

    fixture = TestBed.createComponent(TestComponent);

    testComponent = fixture.componentInstance;
    testComponent.USDBTCPrice = USDBTCPriceMock;

    fixture.detectChanges();
  });

  afterEach(() => {
    // jest.clearAllTimers();
  });

  describe('WHEN USDBTCPrice changes', () => {
    it('THEN USDBTCPrice value SHOULD be passed to the directive and flash trs as increase color css class if previous was minor', () => {
      const USDBTCPriceMockIncrease = {
        ...USDBTCPriceMock,
        rate_float: 2,
        rate: (2).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
      };
      testComponent.USDBTCPrice = USDBTCPriceMockIncrease;

      fixture.autoDetectChanges();

      const trs = fixture.nativeElement.querySelectorAll('tr');
      expect(trs[0].classList.contains('increase')).toBe(true);
    });

    it('THEN USDBTCPrice value SHOULD be passed to the directive and flash trs as descrease color css class if previous was major', () => {
      const USDBTCPriceMockIncrease = {
        ...USDBTCPriceMock,
        rate_float: 1,
        rate: (1).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
      };
      testComponent.USDBTCPrice = USDBTCPriceMockIncrease;

      fixture.autoDetectChanges();

      const trs = fixture.nativeElement.querySelectorAll('tr');
      expect(trs[0].classList.contains('decrease')).toBe(true);
    });

    it('THEN after DELAY_BACKGROUND_COLOR_CHANGE time has passed css classes SHOULD be removed', (done) => {
      const timeout = DELAY_BACKGROUND_COLOR_CHANGE;

      const USDBTCPriceMockIncrease = {
        ...USDBTCPriceMock,
        rate_float: 2,
        rate: (2).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
      };
      testComponent.USDBTCPrice = USDBTCPriceMockIncrease;

      fixture.autoDetectChanges();

      const trs = fixture.nativeElement.querySelectorAll('tr');
      expect(trs[0].classList.contains('increase')).toBe(true);

      // jest.advanceTimersByTime(timeout);

      // setTimeout(() => {
      //   expect(trs[0].classList.contains('increase')).toBe(false);
      //   done();
      // }, timeout);
      expect(trs[0].classList.contains('increase')).toBe(false);
    });
  });
});
