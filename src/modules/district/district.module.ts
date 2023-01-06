import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';

@Module({
  providers: [DistrictService],
  exports: [DistrictService],
})
export class DistrictModule {}
