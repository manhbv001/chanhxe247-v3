import { Exclude } from 'class-transformer';
import { DEFAULT_CUSTOMER_CODE } from 'src/common/constants/user.constant';
import BaseEntity from 'src/common/entities/base.entity';
import { EUserType } from 'src/common/enums/user-type.enum';
import { Utils } from 'src/common/utils';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { PriceList } from '../price-list/price-list.entity';
import { UserConfig } from './user-config.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 255, unique: true, default: DEFAULT_CUSTOMER_CODE })
  code: string;

  @Column({ length: 255 })
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @Column('int')
  type: EUserType;

  @Column()
  is_parent: boolean;

  @Column({ nullable: true })
  avatar_url: string;

  @ManyToOne(() => User, (user) => user.parent, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: User;

  @ManyToOne(() => User, (user) => user.assigned_carrier, { nullable: true })
  @JoinColumn({ name: 'assigned_carrier_id' })
  assigned_carrier: User;

  @OneToOne(() => UserConfig)
  config: UserConfig;

  @ManyToMany(() => PriceList, (priceList) => priceList.assigned_partners)
  assigned_price_lists: PriceList[];

  @ManyToOne(() => PriceList, (priceList) => priceList.applied_customers)
  applied_price_lists: PriceList[];

  @BeforeInsert()
  hashInsertedPassword() {
    this.password = Utils.encodeString(this.password);
  }

  @BeforeUpdate()
  hashUpdatedPassword() {
    this.password = Utils.encodeString(this.password);
  }
}
