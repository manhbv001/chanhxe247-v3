import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { Repository } from 'typeorm';
import { District } from '../district/district.entity';
import { DistrictService } from '../district/district.service';
import { Province } from '../province/province.entity';
import { ProvinceService } from '../province/province.service';
import { User } from '../user/user.entity';
import { Ward } from '../ward/ward.entity';
import { WardService } from '../ward/ward.service';
import { CreatePickAddressDto } from './pick-address.dto';
import { PickAddress } from './pick-address.entity';

export class PickAddressService extends BaseService<PickAddress> {
  constructor(
    @InjectRepository(PickAddress) repo,
    private wardService: WardService,
    private districtService: DistrictService,
    private provinceService: ProvinceService
  ) {
    super(repo);
  }

  public async createOrUpdate(
    id: string | null,
    payload: CreatePickAddressDto,
    requestUser: User
  ) {
    const userId = requestUser.parent?.id || requestUser.id;
    const { data: province } = await this.provinceService.findOne({
      where: {
        id: payload.province_id,
      },
    });
    const { data: district } = await this.districtService.findOne({
      where: {
        id: payload.district_id,
        province: { id: province.id },
      },
    });
    const { data: ward } = await this.wardService.findOne({
      where: {
        id: payload.ward_id,
        district: { id: district.id },
      },
    });

    const ins = new PickAddress();
    ins.id = payload.id;
    ins.address_line = payload.address_line;
    ins.district = district;
    ins.ward = ward;
    ins.province = province;
    ins.customer.id = userId;

    if (payload.is_default) {
      await this.repository
        .createQueryBuilder()
        .update(PickAddress)
        .set({ is_default: false })
        .where('customer_id = :userId', { userId })
        .execute();
    }

    if (id) ins.id = id;
    return this.repository.save(ins);
  }

  public queryByCustomer(requestUser: User) {
    return this.repository.findBy({
      customer: {
        id: requestUser.id,
      },
    });
  }

  public customDeleteOne(id: string, requestUser: User) {
    return this.createOne({
      id,
      customer: {
        id: requestUser.parent?.id || requestUser.id,
      },
    });
  }
}
