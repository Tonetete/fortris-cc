import { BtcToUsdFormatPipe } from './btc-to-usd-format.pipe';

describe('BtcToUsdFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new BtcToUsdFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
