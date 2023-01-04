import { FindOneOptions, Repository } from 'typeorm';
import BaseEntity from '../entities/base.entity';
import { Response, SuccessResponse } from '../utils/Response';
export abstract class BaseService<T extends BaseEntity> {
  protected readonly repository: Repository<T>;
  protected readonly user;

  constructor(repo: Repository<T>) {
    this.repository = repo;
  }

  async createOne(payload: any): Promise<Response<T>> {
    const rs = await this.repository.save(payload);

    return new SuccessResponse(rs);
  }

  async findOne(payload: FindOneOptions<T>): Promise<Response<T>> {
    const rs = await this.repository.findOne(payload);

    return new SuccessResponse(rs);
  }

  async findAll(payload: FindOneOptions<T>): Promise<Response<T[]>> {
    const rs = await this.repository.find({
      order: { created_at: 'DESC' },
      ...payload,
    } as FindOneOptions<T>);

    return new SuccessResponse(rs);
  }

  async updateOne(id: string, payload: T): Promise<Response<T>> {
    const rs = await this.repository.save(payload);

    return new SuccessResponse(rs);
  }
}
