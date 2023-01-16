import { InjectRepository } from '@nestjs/typeorm';
import { EUserType } from 'src/common/enums/user-type.enum';
import { BaseService } from 'src/common/services/base.service';
import { Repository } from 'typeorm';
import { DistrictService } from '../district/district.service';
import { PickAddressService } from '../pick-address/pick-address.service';
import { PriceListService } from '../price-list/price-list.service';
import { ReceiverService } from '../receiver/receiver.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateShipmentDto } from './shipment.dto';
import { Shipment } from './shipment.entity';
export class ShipmentService extends BaseService<Shipment> {
  constructor(
    @InjectRepository(Shipment) repo: Repository<Shipment>,
    private pickAddressService: PickAddressService,
    private userService: UserService,
    private receiverService: ReceiverService,
    private priceListService: PriceListService,
    private districtService: DistrictService
  ) {
    super(repo);
  }
  public async create(payload: CreateShipmentDto, user: User) {
    let customerId: string;
    if (user.type === EUserType.Customer)
      customerId = user.parent_id || user.id;
    else customerId = payload.customer_id;

    const { data: customer } = await this.userService.findOne({
      where: {
        id: customerId,
      },
    });

    let carrierId: string;
    if (user.type === EUserType.Carrier) carrierId = user.parent_id || user.id;
    else if (user.type === EUserType.Customer)
      carrierId = user.assigned_carrier_id;
    else if (user.type === EUserType.System) carrierId = payload.carrier_id;

    const { data: carrier } = await this.userService.findOne({
      where: {
        id: carrierId,
      },
      relations: {
        config: true,
      },
    });

    const { data: pickAddress } = await this.pickAddressService.findOne({
      where: { id: payload.pick_address_id },
    });

    const receiver = await this.receiverService.create(
      {
        fullname: payload.receiver_name,
        phone: payload.receiver_phone,
        province_id: payload.receiver_province_id,
        district_id: payload.receiver_district_id,
        ward_id: payload.receiver_ward_id,
        address_line: payload.receiver_address_line,
      },
      customer
    );

    const conversionWeight =
      (payload.parcel_quantity *
        (payload.parcel_height *
          payload.parcel_width *
          payload.parcel_length)) /
      carrier.config.weight_factor;

    const parcelWeight = Math.ceil(
      conversionWeight > payload.parcel_weight
        ? conversionWeight
        : payload.parcel_weight
    );

    const { data: receiverDistrict } = await this.districtService.findOne({
      where: { id: payload.receiver_district_id },
    });
    const priceListFees = await this.priceListService.calcPrice({
      price_list_id: payload.price_list_id,
      parcel_weight: parcelWeight,
      parcel_value: payload.parcel_value,
      is_insured: payload.is_insured,
      loading_type: payload.loading_type,
      customer_id: customerId,
      from_district_level: pickAddress.district.level,
      to_district_level: receiverDistrict.level,
    });

    const newShipment = new Shipment();
    newShipment.code = 'abc';

    return this.repository.save(newShipment);
  }
}
