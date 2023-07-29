import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtcUsdCellTemplateComponent } from './btc-usd-cell-template.component';

describe('BtcUsdCellTemplateComponent', () => {
  let component: BtcUsdCellTemplateComponent;
  let fixture: ComponentFixture<BtcUsdCellTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtcUsdCellTemplateComponent]
    });
    fixture = TestBed.createComponent(BtcUsdCellTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
