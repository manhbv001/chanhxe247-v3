import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EUserType } from 'src/common/enums/user-type.enum';
import { BaseService } from 'src/common/services/base.service';
import { Repository } from 'typeorm';
import { UserConfig } from './user-config.entity';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    repo: Repository<User>,
    @InjectRepository(UserConfig)
    private configRepo: Repository<UserConfig>
  ) {
    super(repo);
  }

  private async create(
    payload: CreateUserDto & {
      type: EUserType;
      parent?: User;
      isParent: boolean;
    }
  ) {
    const existed = await this.findOne({
      where: [
        {
          email: payload.email,
          type: payload.type,
        },
        {
          username: payload.username,
        },
      ],
    });
    if (existed) throw new BadRequestException('Người dùng đã tồn tại!');

    const assignedCarrier = await this.repository.findOneOrFail({
      where: {
        id: payload.assigned_carrier_id,
      },
    });
    const userConfig = new UserConfig();
    userConfig.commission = payload.commission;
    userConfig.commission_type = payload.commission_type;
    userConfig.insurance_fee = payload.insurance_fee;
    userConfig.insurance_value = payload.insurance_value;
    userConfig.fee_pay_by_shop = payload.fee_pay_by_shop;
    userConfig.delivery_review = payload.delivery_review;
    userConfig.delivery_test = payload.delivery_review;
    userConfig.weight_factor = payload.weigt_factor;

    const ins = new User();
    ins.name = payload.name;
    ins.email = payload.email;
    ins.username = payload.username;
    ins.code = payload.code;
    ins.phone = payload.phone;
    ins.password = payload.password;
    ins.type = payload.type;
    ins.is_parent = !!payload.isParent;
    ins.parent = payload.parent;
    ins.assigned_carrier = assignedCarrier;
    ins.config = userConfig;

    return this.repository.save(ins);
  }

  public async createSystemUser(payload: CreateUserDto, requestUser: User) {
    const newPayload = {
      ...payload,
      parent: requestUser,
      isParent: false,
      type: EUserType.System,
    };

    return this.create(newPayload);
  }

  public async createCarrier(payload: CreateUserDto) {
    return this.create({
      ...payload,
      isParent: true,
      type: EUserType.Carrier,
    });
  }

  public async createCustomer(payload: CreateUserDto, requestUser: User) {
    const assignCarrierId = requestUser.is_parent
      ? requestUser.id
      : requestUser.parent.id;

    return this.create({
      ...payload,
      isParent: true,
      assigned_carrier_id: assignCarrierId,
      type: EUserType.Customer,
    });
  }

  public async getUserConfig(id: string) {
    return this.configRepo.findOneByOrFail({ user_id: id });
  }
}
