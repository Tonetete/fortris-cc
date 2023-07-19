import { Injectable } from '@nestjs/common';
import { USDBTCPrice } from '@fortris-cc/types';

@Injectable()
export class TrackerService {
  minRange = 5000;
  maxRange = 12000;

  getBTCToUSDPrice(): USDBTCPrice {
    const randomBTCPrice = Math.floor(
      Math.random() * (this.maxRange - this.minRange + 1) + this.minRange
    );
    return {
      rate_float: randomBTCPrice,
      code: 'USD',
      description: 'USD price of bitcoin',
      rate: randomBTCPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  }
}
