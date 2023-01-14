import BaseEntity from 'src/common/entities/base.entity';
import { EDebtStatus, EDebtType } from 'src/common/enums/debt.enums';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Shipment } from '../shipment/shipment.entity';
import { User } from '../user/user.entity';

@Entity()
export class Debt extends BaseEntity {
  @Column()
  code: string;

  @Column({ length: 255 })
  type: EDebtType;

  @Column('int')
  status: EDebtStatus;

  @Column()
  total_amount: number;

  @Column({ default: 0 })
  paid_amount: number;

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

  @ManyToMany(() => Shipment, (shipment) => shipment.debts)
  shipments: Shipment[];
}
