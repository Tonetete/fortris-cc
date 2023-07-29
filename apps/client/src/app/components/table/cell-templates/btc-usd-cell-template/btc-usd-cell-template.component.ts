import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { USDBTCPrice } from '@fortris-cc/types';
import { TrackerService } from 'apps/client/src/app/services/tracker.service';

@Component({
  selector: 'fortris-btc-usd-cell-template',
  template: `<div>
    <span>{{ element | number : '1.6-6' }} BTC</span>
    <span>{{ element | btcToUsdFormat : USDBTCPrice }}</span>
  </div> `,
  styleUrls: ['./btc-usd-cell-template.component.css'],
})
export class BtcUsdCellTemplateComponent {
  @Input() element: number | undefined;
  USDBTCPrice: USDBTCPrice | null = null;

  constructor(private trackerService: TrackerService) {
    this.trackerService.USDBTCPrice$.subscribe((price) => {
      this.USDBTCPrice = price;
    });
  }
}
