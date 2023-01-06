import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { Region } from './region.entity';

export class RegionService extends BaseService<Region> {
  constructor(@InjectRepository(Region) repo) {
    super(repo);
  }
}
