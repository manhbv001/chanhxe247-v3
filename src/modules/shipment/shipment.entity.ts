import BaseEntity from 'src/common/entities/base.entity';
import { ELoadType } from 'src/common/enums/load-type.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { PickAddress } from '../pick-address/pick-address.entity';
import { PriceList } from '../price-list/price-list.entity';
import { Receiver } from '../receiver/receiver.entity';
import { ShipmentStatus } from '../shipment-status/shipment-status.entity';
import { User } from '../user/user.entity';

@Entity()
export class Shipment extends BaseEntity {
  @Column({ length: 128 })
  code: string;

  parcel_name: string;
  parcel_value: number;
  parcel_quantity: number;
  parcel_width: number;
  parcel_height: number;
  parcel_length: number;
  parcel_weight: number;
  parcel_conversion_weight: number;
  parcel_note: string;

  is_insured: boolean;
  loading_type: ELoadType;
  cod_amount: number;

  service_fee: number;
  insurance_fee: number;
  return_fee: number;
  load_fee: number;
  region_pick_fee: number;
  region_deliver_fee: number;
  cod_fee: number;
  total_fee: number;

  @OneToOne(() => ShipmentStatus)
  @JoinColumn()
  current_status: ShipmentStatus;

  @ManyToOne(() => PickAddress)
  pick_address: PickAddress;

  @ManyToOne(() => Receiver)
  receiver: Receiver;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'carrier_id' })
  carrier: User;

  @ManyToOne(() => PriceList)
  @JoinColumn({ name: 'price_list_id' })
  price_list: PriceList;
}
