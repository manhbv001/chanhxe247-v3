import { Module } from '@nestjs/common';
import { PickAddressController } from './pick-address.controller';
import { PickAddressService } from './pick-address.service';

@Module({
  exports: [PickAddressService],
  providers: [PickAddressService],
  controllers: [PickAddressController],
})
export class PickAddressModule {}
