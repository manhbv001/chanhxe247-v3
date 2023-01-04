import BaseEntity from 'src/common/entities/base.entity';
import { EInvoiceStatus, EInvoiceType } from 'src/common/enums/invoice.enums';
import { Column, ManyToOne, OneToOne } from 'typeorm';
import { Debt } from '../debt/debt.entity';
import { User } from '../user/user.entity';

export class Invoice extends BaseEntity {
  @Column()
  code: string;

  @Column()
  amount: number;

  @Column()
  actual_amount: number;

  @Column('int')
  type: EInvoiceType;

  @Column('int')
  status: EInvoiceStatus;

  @Column()
  note: string;

  @OneToOne(() => User)
  customer: User;

  @ManyToOne(() => Debt)
  debt: Debt;
}
