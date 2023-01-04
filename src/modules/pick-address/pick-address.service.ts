import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { User } from '../user/user.entity';
import { CreatePickAddressDto } from './pick-address.dto';
import { PickAddress } from './pick-address.entity';

export class PickAddressService extends BaseService<PickAddress> {
  constructor(@InjectRepository(PickAddress) repo) {
    super(repo);
  }

  public async create(payload: CreatePickAddressDto, requestUser: User) {
    const ins = new PickAddress();
    ins.address_line = payload.province_id;
    ins.district.id = payload.district_id;
    ins.ward.id = payload.ward_id;
    ins.address_line = payload.province_id;
    ins.customer.id = requestUser.parent.id || requestUser.id;

    return this.repository.save(ins);
  }
}
