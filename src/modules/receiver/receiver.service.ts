import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { Repository } from 'typeorm';
import { DistrictService } from '../district/district.service';
import { User } from '../user/user.entity';
import { WardService } from '../ward/ward.service';
import { CreateReceiverDto } from './receiver.dto';
import { Receiver } from './receiver.entity';

export class ReceiverService extends BaseService<Receiver> {
  constructor(
    @InjectRepository(Receiver) repo: Repository<Receiver>,
    private districtService: DistrictService,
    private wardSerivce: WardService
  ) {
    super(repo);
  }

  public async create(payload: CreateReceiverDto, user: User) {
    try {
      await this.districtService.findOne({
        where: {
          id: payload.district_id,
          province_id: payload.province_id,
        },
      });
      await this.wardSerivce.findOne({
        where: {
          id: payload.district_id,
          district_id: payload.district_id,
        },
      });
    } catch (error) {
      throw new BadRequestException('Địa chỉ không hợp lệ');
    }

    const existed = await this.repository.findOneBy({
      province_id: payload.province_id,
      district_id: payload.district_id,
      ward_id: payload.district_id,
      phone: payload.phone,
      customer_id: user.parent_id || user.id,
    });

    if (existed) return existed;

    const newReceiver = new Receiver();
    newReceiver.province_id = payload.province_id;
    newReceiver.district_id = payload.district_id;
    newReceiver.ward_id = payload.district_id;
    newReceiver.phone = payload.phone;
    newReceiver.fullname = payload.fullname;
    newReceiver.address_line = payload.address_line;
    newReceiver.customer_id = user.parent_id || user.id;

    return this.repository.save(newReceiver);
  }
}
