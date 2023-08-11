import { USDBTCPriceMock } from '../__mock__/values.mock';
import { BtcToUsdFormatPipe } from './btc-to-usd-format.pipe';

describe('BtcToUsdFormatPipe', () => {
  describe('WHEN pass value and usdToBtcData', () => {
    it('THEN value in usd SHOULD be returned', () => {
      const expectedValue = `$12.34`;
      const pipe = new BtcToUsdFormatPipe();
      const value = 10;
      const result = pipe.transform(value, USDBTCPriceMock);

      expect(result).toEqual(expectedValue);
    });
    
    it('THEN if no USD code is presented, 0 value SHOULD be returned', () => {
      const expectedValue = `$12.34`;
      const pipe = new BtcToUsdFormatPipe();
      const value = 10;
      const noRateFloatUSDBTCPriceMock = {
        ...USDBTCPriceMock,
        code: 'EUR',
      };

      const result = pipe.transform(value, noRateFloatUSDBTCPriceMock);

      expect(result).toEqual('0');
    });
  });
});
