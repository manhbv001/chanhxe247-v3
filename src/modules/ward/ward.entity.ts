import BaseEntity from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { District } from '../district/district.entity';

@Entity()
export class Ward extends BaseEntity {
  @Column({ length: 255 })
  code: string;

  @Column({ length: 255 })
  name: string;

  @Column()
  map_names: string;

  @Column({ length: 128 })
  short_name: string;

  @Column({ length: 128 })
  zipcode: string;

  @Column()
  priority: number;

  @ManyToOne(() => District)
  @JoinColumn({ name: 'district_id' })
  district: District;
}
