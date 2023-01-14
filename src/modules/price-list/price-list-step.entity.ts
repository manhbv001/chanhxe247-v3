import BaseEntity from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PriceList } from './price-list.entity';

@Entity()
export class PriceListStep extends BaseEntity {
  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  value: number;

  @ManyToOne(() => PriceList, (priceList) => priceList.steps)
  @JoinColumn({ name: 'price_list_id' })
  priceList: PriceList;

  @Column()
  price_list_id: string;
}
