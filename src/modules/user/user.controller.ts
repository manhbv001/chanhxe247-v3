import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Post('carriers')
  createCarrier(@Body() payload: CreateUserDto) {
    return this.service.createCarrier(payload);
  }

  @Post('customers')
  createCustomer(@Body() payload: CreateUserDto, @GetUser() requestUser: User) {
    return this.service.createCustomer(payload, requestUser);
  }
}
