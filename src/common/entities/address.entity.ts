import { District } from 'src/modules/district/district.entity';
import { Province } from 'src/modules/province/province.entity';
import { Ward } from 'src/modules/ward/ward.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import BaseEntity from './base.entity';

export class AddressEntity extends BaseEntity {
  @ManyToOne(() => Province)
  @JoinColumn({ name: 'province_id' })
  province: Province;

  @ManyToOne(() => District)
  @JoinColumn({ name: 'district_id' })
  district: District;

  @ManyToOne(() => Ward)
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;

  @Column({ length: 255 })
  address_line: string;

  @Column({ length: 512 })
  full_address: string;

  @BeforeInsert()
  hashInsertedPassword() {
    this.full_address = `${this.province.name}, ${this.district.name}, ${this.ward.name}, ${this.address_line}`;
  }

  @BeforeUpdate()
  hashUpdatedPassword() {
    this.full_address = `${this.province.name}, ${this.district.name}, ${this.ward.name}, ${this.address_line}`;
  }
}
