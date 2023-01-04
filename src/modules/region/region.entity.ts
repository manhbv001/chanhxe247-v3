import BaseEntity from 'src/common/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Province } from '../province/province.entity';

@Entity()
export class Region extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 128 })
  short_name: string;

  @Column({ length: 128 })
  code: string;

  @Column({ nullable: true })
  distance: number;

  @Column()
  description: string;

  @ManyToMany(() => Province, (province) => province.regions)
  provinces: Province[];
}
