import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorators/user.decorator';
import { CreatePickAddressDto } from './pick-address.dto';
import { PickAddressService } from './pick-address.service';

@Controller('pick-addresses')
export class PickAddressController {
  constructor(private service: PickAddressService) {}

  @Get()
  query(@GetUser() requestUser) {
    return this.service.queryByCustomer(requestUser);
  }

  @Post()
  create(@Body() body: CreatePickAddressDto, @GetUser() requestUser) {
    return this.service.createOrUpdate(null, body, requestUser);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: CreatePickAddressDto,
    @GetUser() requestUser
  ) {
    return this.service.createOrUpdate(id, body, requestUser);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() requestUser) {
    return this.service.customDeleteOne(id, requestUser);
  }
}
