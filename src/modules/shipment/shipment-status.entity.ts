import BaseEntity from 'src/common/entities/base.entity';
import { Column } from 'typeorm';

export class ShipmentStatus extends BaseEntity {
  @Column('int')
  code: number;

  @Column({ nullable: true })
  state_message: string;

  @Column({ nullable: true })
  note: string;
}
