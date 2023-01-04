import BaseEntity from 'src/common/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Region } from '../region/region.entity';

@Entity()
export class Province extends BaseEntity {
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

  @ManyToMany(() => Region, (region) => region.provinces)
  regions: Region[];
}
