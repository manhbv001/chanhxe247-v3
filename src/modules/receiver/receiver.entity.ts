import { AddressEntity } from 'src/common/entities/address.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Receiver extends AddressEntity {
  @Column({ length: 255 })
  fullname: string;

  @Column({ length: 128 })
  phone: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id' })
  customer: User;
}
