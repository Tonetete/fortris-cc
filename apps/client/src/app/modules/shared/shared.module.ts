import { NgModule } from '@angular/core';

import { BtcToUsdFormatPipe } from '../../pipes/btc-to-usd-format.pipe';

@NgModule({
  declarations: [BtcToUsdFormatPipe],
  imports: [],
  providers: [],
  exports: [BtcToUsdFormatPipe],
})
export class SharedModule {}
