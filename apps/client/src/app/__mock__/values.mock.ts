export const USDBTCPriceMock = {
    rate_float: 1.234,
    code: 'USD',
    description: 'USD price of bitcoin',
    rate: (1.234).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }),
};