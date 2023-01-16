import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictModule } from '../district/district.module';
import { WardModule } from '../ward/ward.module';
import { Receiver } from './receiver.entity';
import { ReceiverService } from './receiver.service';

@Module({
  providers: [ReceiverService],
  imports: [TypeOrmModule.forFeature([Receiver]), DistrictModule, WardModule],
  exports: [ReceiverService],
})
export class ReceiverModule {}
