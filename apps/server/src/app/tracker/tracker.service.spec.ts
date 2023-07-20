import { Test, TestingModule } from '@nestjs/testing';
import { TrackerService } from './tracker.service';

describe('TrackerService', () => {
  let service: TrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackerService],
    }).compile();

    service = module.get<TrackerService>(TrackerService);
  });


  describe('WHEN getBTCToUSDPrice', () => {
    it('THEN tracker SHOULD return BTC random price', () => {
      const result = service.getBTCToUSDPrice();
      expect(result).toBeDefined();
    });
  });
});
