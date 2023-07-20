import { Test, TestingModule } from '@nestjs/testing';
import { TrackerGateway } from './tracker.gateway';
import { TrackerService } from './tracker.service';
import { USDBTCPrice } from '@fortris-cc/types';
import { Logger } from '@nestjs/common';

class TrackerServiceMock {
  getBTCToUSDPrice(): USDBTCPrice {
    return {
      rate_float: 1230,
      code: 'USD',
      description: '',
      rate: (1230).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  }
}

describe('TrackerGateway', () => {
  let trackerGateway: TrackerGateway;
  let trackerService: TrackerService;
  let logger: Logger;
  const mockServer = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackerGateway,
        { provide: TrackerService, useClass: TrackerServiceMock },
      ],
    }).compile();

    trackerGateway = module.get<TrackerGateway>(TrackerGateway);
    trackerService = module.get<TrackerService>(TrackerService);
    logger = trackerGateway['logger'];
    trackerGateway.afterInit(mockServer); // Mock server object
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('WHEN init Websocket Server', () => {
    it('THEN BTC price SHOULD be emitted in initialization', () => {
      const emitSpy = jest.spyOn(trackerGateway['server'], 'emit');
      trackerGateway.afterInit({ emit: jest.fn() });
      expect(emitSpy).toHaveBeenCalledWith(
        'Welcome to BTC Tracker Websocket Server'
      );
      expect(emitSpy).toHaveBeenCalledWith('getUSDBTCPrice', {
        rate_float: 1230,
        code: 'USD',
        description: '',
        rate: '$1,230.00',
      });
    });
    it('THEN current BTC price SHOULD be logged after emitting', () => {
      const logSpy = jest.spyOn(logger, 'log');
      trackerGateway.afterInit({ emit: jest.fn() });
      expect(logSpy).toHaveBeenCalledWith('Current BTC Price: 1230');
    });
  });

  describe('WHEN getUSDBTCPriceMesage', () => {
    it('THEN BTC price "getUSDBTCPriceMessage" subscribeMessage SHOULD be emitted', () => {
      const emitSpy = jest.spyOn(trackerGateway['server'], 'emit');
      trackerGateway.getUSDBTCPrice();
      expect(emitSpy).toHaveBeenCalledWith('getUSDBTCPrice', {
        rate_float: 1230,
        code: 'USD',
        description: '',
        rate: '$1,230.00',
      });
    });
  });
});
