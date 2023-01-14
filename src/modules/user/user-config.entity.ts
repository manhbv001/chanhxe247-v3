import BaseEntity from 'src/common/entities/base.entity';
import { ECommissionType } from 'src/common/enums/commission-type.enum';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserConfig extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @Column('int', { default: 0 })
  commission: number;

  @Column({ default: ECommissionType.Default })
  commission_type: ECommissionType;

  @Column('int', { default: 0 })
  insurance_fee: number;

  @Column('int', { default: 0 })
  insurance_value: number;

  @Column({ default: false })
  fee_pay_by_shop: boolean;

  @Column({ default: false })
  delivery_review: boolean;

  @Column({ default: false })
  delivery_test: boolean;

  @Column({ default: 5000 })
  weigt_factor: number;
}
