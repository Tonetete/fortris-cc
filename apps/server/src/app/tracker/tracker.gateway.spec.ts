import { Test, TestingModule } from '@nestjs/testing';
import { TrackerGateway } from './tracker.gateway';
import { TrackerService } from './tracker.service';

describe('TrackerGateway', () => {
  let gateway: TrackerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackerGateway, TrackerService],
    }).compile();

    gateway = module.get<TrackerGateway>(TrackerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
