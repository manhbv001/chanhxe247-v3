import { AddressEntity } from 'src/common/entities/address.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class PickAddress extends AddressEntity {
  @Column({ length: 255 })
  contact_name: string;

  @Column({ length: 128 })
  phone: string;

  @Column({ default: false })
  is_default: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column()
  customer_id: string;
}
