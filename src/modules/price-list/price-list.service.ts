import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { PriceListStep } from './price-list-step.entity';
import { CreatePriceListDto } from './price-list.dto';
import { PriceList } from './price-list.entity';

export class PriceListService extends BaseService<PriceList> {
  constructor(
    @InjectRepository(PriceList) repo,
    private userService: UserService
  ) {
    super(repo);
  }

  public async createCustom(payload: CreatePriceListDto) {
    const newSteps = payload.steps.map((e) => {
      const step = new PriceListStep();
      step.from = e.from;
      step.to = e.to;
      step.value = e.value;

      return newSteps;
    });
    const { data: assignedPartners } = await this.userService.findAll({
      where: payload.assigned_partner_ids.map((e) => ({ id: e })),
    });
    const { data: appliedCustomers } = await this.userService.findAll({
      where: payload.applied_customer_ids.map((e) => ({ id: e })),
    });

    const newPriceList = new PriceList();
    newPriceList.name = payload.name;
    newPriceList.type = payload.type;
    newPriceList.suburban_pick_fee = payload.suburban_pick_fee;
    newPriceList.country_pick_fee = payload.country_pick_fee;
    newPriceList.suburban_del_fee = payload.suburban_del_fee;
    newPriceList.country_del_fee = payload.country_del_fee;
    newPriceList.load_fee = payload.load_fee;
    newPriceList.return_fee_unit = payload.return_fee_unit;
    newPriceList.return_fee_value = payload.return_fee_value;
    newPriceList.insurance_fee = payload.insurance_fee;
    newPriceList.insurance_value = payload.insurance_value;
    newPriceList.min_value = payload.min_value;
    newPriceList.lead_time = payload.lead_time;
    newPriceList.from_region.id = payload.from_region_id;
    newPriceList.to_region.id = payload.to_region_id;
    newPriceList.assigned_partners = assignedPartners;
    newPriceList.applied_customers = appliedCustomers;
    newPriceList.steps = newSteps;

    return this.repository.save(newPriceList);
  }
}
