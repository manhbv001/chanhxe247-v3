import { Body, Controller, Post } from '@nestjs/common';
import { CreatePriceListDto } from './price-list.dto';
import { PriceListService } from './price-list.service';

@Controller('price-lists')
export class PriceListController {
  constructor(private service: PriceListService) {}

  @Post()
  create(@Body() body: CreatePriceListDto) {
    return this.service.createCustom(body);
  }
}
