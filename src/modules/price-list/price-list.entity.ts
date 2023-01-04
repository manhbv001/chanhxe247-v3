import BaseEntity from 'src/common/entities/base.entity';
import { EPriceListType } from 'src/common/enums/price-list-type.enum';
import { EReturnFeeUnit } from 'src/common/enums/return-fee-unit.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Region } from '../region/region.entity';
import { User } from '../user/user.entity';
import { PriceListStep } from './price-list-step.entity';

@Entity()
export class PriceList extends BaseEntity {
  @Column({ length: 512 })
  name: string;

  @Column({ length: 128 })
  type: EPriceListType;

  @Column()
  suburban_pick_fee: number;

  @Column()
  country_pick_fee: number;

  @Column()
  suburban_del_fee: number;

  @Column()
  country_del_fee: number;

  @Column()
  load_fee: number;

  @Column()
  return_fee_unit: EReturnFeeUnit;

  @Column()
  return_fee_value: number;

  @Column()
  insurance_fee: number;

  @Column()
  insurance_value: number;

  @Column()
  min_value: number;

  @Column()
  lead_time: number;

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'from_region_id' })
  from_region: Region;

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'to_region_id' })
  to_region: Region;

  @ManyToMany(() => User, (user) => user.assigned_price_lists)
  assigned_partners: User[];

  @ManyToMany(() => User, (user) => user.applied_price_lists)
  applied_customers: User[];

  @OneToMany(() => PriceListStep, (step) => step.priceList)
  steps: PriceListStep[];
}
