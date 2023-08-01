import { NgModule } from '@angular/core';

import { BtcToUsdFormatPipe } from '../../pipes/btc-to-usd-format.pipe';
import { FlashRowStyleBTCTrackingDirective } from '../table/directives/flash-row-style-btc-tracking/flash-row-style-btc-tracking.directive';

@NgModule({
  declarations: [BtcToUsdFormatPipe, FlashRowStyleBTCTrackingDirective],
  imports: [],
  providers: [],
  exports: [BtcToUsdFormatPipe, FlashRowStyleBTCTrackingDirective],
})
export class SharedModule {}
