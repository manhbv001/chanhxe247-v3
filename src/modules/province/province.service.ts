import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { Province } from './province.entity';

export class ProvinceService extends BaseService<Province> {
  constructor(@InjectRepository(Province) repo) {
    super(repo);
  }
}
