import BaseEntity from 'src/common/entities/base.entity';
import { EDistrictLevel } from 'src/common/enums/district-level.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Province } from '../province/province.entity';

@Entity()
export class District extends BaseEntity {
  @Column({ length: 255 })
  code: string;

  @Column({ length: 255 })
  name: string;

  @Column({ default: 2 })
  level: EDistrictLevel;

  @Column()
  map_names: string;

  @Column({ length: 128 })
  short_name: string;

  @Column({ length: 128 })
  zipcode: string;

  @Column()
  priority: number;

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'province_id' })
  province: Province;

  @Column()
  province_id: string;
}
