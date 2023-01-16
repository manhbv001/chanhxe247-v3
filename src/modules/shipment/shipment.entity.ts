import BaseEntity from 'src/common/entities/base.entity';
import { ELoadType } from 'src/common/enums/load-type.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Debt } from '../debt/debt.entity';
import { PickAddress } from '../pick-address/pick-address.entity';
import { PriceList } from '../price-list/price-list.entity';
import { Receiver } from '../receiver/receiver.entity';
import { User } from '../user/user.entity';
import { ShipmentStatus } from './shipment-status.entity';

@Entity()
export class Shipment extends BaseEntity {
  @Column({ length: 128 })
  code: string;

  @Column()
  parcel_name: string;

  @Column()
  parcel_value: number;

  @Column()
  parcel_quantity: number;

  @Column()
  parcel_width: number;

  @Column()
  parcel_height: number;

  @Column()
  parcel_length: number;

  @Column()
  parcel_weight: number;

  @Column()
  parcel_conversion_weight: number;

  @Column({ default: '' })
  parcel_note: string;

  @Column({ default: false })
  is_insured: boolean;

  @Column({ length: 128, nullable: true })
  loading_type?: ELoadType;

  @Column()
  cod_amount: number;

  @Column()
  service_fee: number;

  @Column()
  insurance_fee: number;

  @Column()
  return_fee: number;

  @Column()
  load_fee: number;

  @Column()
  region_pick_fee: number;

  @Column()
  region_deliver_fee: number;

  @Column()
  cod_fee: number;

  @Column()
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

  @Column()
  customer_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'carrier_id' })
  carrier: User;

  @Column()
  carrier_id: string;

  @ManyToOne(() => PriceList)
  @JoinColumn({ name: 'price_list_id' })
  price_list: PriceList;

  @Column()
  price_list_id: string;

  @ManyToMany(() => Debt, (debt) => debt.shipments)
  debts: Debt;
}
