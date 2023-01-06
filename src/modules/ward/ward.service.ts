import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { Ward } from './ward.entity';

export class WardService extends BaseService<Ward> {
  constructor(@InjectRepository(Ward) repo) {
    super(repo);
  }
}
