import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';

@Module({
  providers: [ProvinceService],
  exports: [ProvinceService],
})
export class ProvinceModule {}
