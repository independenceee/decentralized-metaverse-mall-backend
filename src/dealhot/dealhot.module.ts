import { Module } from '@nestjs/common';
import { DealhotController } from './dealhot.controller';
import { DealhotService } from './dealhot.service';

@Module({
  controllers: [DealhotController],
  providers: [DealhotService]
})
export class DealhotModule {}
