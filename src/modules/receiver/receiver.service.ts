import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { Repository } from 'typeorm';
import { Receiver } from './receiver.entity';

export class ReceiverService extends BaseService<Receiver> {
  constructor(@InjectRepository(Receiver) repo: Repository<Receiver>) {
    super(repo);
  }
}
