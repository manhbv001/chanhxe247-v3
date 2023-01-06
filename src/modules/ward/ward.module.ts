import { Module } from '@nestjs/common';
import { WardService } from './ward.service';

@Module({
  providers: [WardService],
  exports: [WardService],
})
export class WardModule {}
