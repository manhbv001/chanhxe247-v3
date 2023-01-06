import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { District } from './district.entity';

export class DistrictService extends BaseService<District> {
  constructor(@InjectRepository(District) repo) {
    super(repo);
  }
}
