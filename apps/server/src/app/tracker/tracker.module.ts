import { Module } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerGateway } from './tracker.gateway';

@Module({
  providers: [TrackerGateway, TrackerService],
})
export class TrackerModule {}
