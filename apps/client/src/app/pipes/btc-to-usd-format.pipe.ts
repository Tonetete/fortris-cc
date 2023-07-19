import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { USDBTCPrice } from '@fortris-cc/types';

@Pipe({
  name: 'btcToUsdFormat'
})
export class BtcToUsdFormatPipe implements PipeTransform {

  transform(
    value: number | undefined,
    usdToBtcData: USDBTCPrice | null
  ): unknown {
    let formatValue = this.formatCurrency(value, usdToBtcData);
    return formatValue;
  }

  formatCurrency(
    value: number | undefined,
    usdToBtcData: USDBTCPrice | null
  ): string {
    let formatValue = '';

    switch (usdToBtcData?.code) {
      case 'USD':
        const currencyPipe = new CurrencyPipe('en-US');
        formatValue = currencyPipe.transform(
          (usdToBtcData.rate_float || 1) * (value || 0),
          'USD',
          'symbol',
          '.1-2'
        ) as string;
        return formatValue;
      default:
        return '0';  
    }
  }

}
