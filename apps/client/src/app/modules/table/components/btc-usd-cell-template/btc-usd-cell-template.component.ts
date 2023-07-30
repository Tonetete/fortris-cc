import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { USDBTCPrice } from '@fortris-cc/types';

import { SharedModule } from '../../../shared/shared.module';

import { TrackerService } from '../../../../services/tracker.service';

@Component({
  selector: 'fortris-btc-usd-cell-template',
  template: `<div>
    <span>{{ element | number : '1.6-6' }} BTC</span>
    <span>{{ element | btcToUsdFormat : USDBTCPrice }}</span>
  </div> `,
  styleUrls: ['./btc-usd-cell-template.component.css'],
  imports: [DecimalPipe, SharedModule],
  standalone: true,
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
