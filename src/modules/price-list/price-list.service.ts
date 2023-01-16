import { InjectRepository } from '@nestjs/typeorm';
import { EDistrictLevel } from 'src/common/enums/district-level.enum';
import { ELoadType } from 'src/common/enums/load-type.enum';
import { EPriceListType } from 'src/common/enums/price-list-type.enum';
import { EReturnFeeUnit } from 'src/common/enums/return-fee-unit.enum';
import { BaseService } from 'src/common/services/base.service';
import { Utils } from 'src/common/utils';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { PriceListStep } from './price-list-step.entity';
import { CalcPriceDto, CreatePriceListDto } from './price-list.dto';
import { PriceList } from './price-list.entity';

export class PriceListService extends BaseService<PriceList> {
  constructor(
    @InjectRepository(PriceList) repo: Repository<PriceList>,
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
    const { data: assignedCarriers } = await this.userService.findAll({
      where: payload.assigned_carrier_ids.map((e) => ({ id: e })),
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
    newPriceList.assigned_carriers = assignedCarriers;
    newPriceList.applied_customers = appliedCustomers;
    newPriceList.steps = newSteps;

    return this.repository.save(newPriceList);
  }

  public async calcPrice(payload: CalcPriceDto) {
    const priceList = await this.repository.findOneByOrFail({
      id: payload.price_list_id,
    });

    let serviceFee = this.calcServiceFee(
      priceList.steps,
      payload.parcel_weight,
      priceList.type
    );
    serviceFee =
      serviceFee > priceList.min_value ? serviceFee : priceList.min_value;

    let returnFee = 0;
    returnFee =
      priceList.return_fee_unit === EReturnFeeUnit.Percent
        ? (serviceFee / 100) * priceList.return_fee_value
        : priceList.return_fee_value;

    let regionPickFee = 0;
    if (payload.from_district_level === EDistrictLevel.Country)
      regionPickFee = priceList.country_pick_fee
        ? (serviceFee / 100) * priceList.country_pick_fee
        : 0;
    if (payload.from_district_level === EDistrictLevel.Suburban)
      regionPickFee = regionPickFee = priceList.suburban_pick_fee
        ? (serviceFee / 100) * priceList.suburban_pick_fee
        : 0;

    let regionDeliverFee = 0;
    if (payload.to_district_level === EDistrictLevel.Country)
      regionDeliverFee = priceList.country_del_fee
        ? (serviceFee / 100) * priceList.country_del_fee
        : 0;
    if (payload.to_district_level === EDistrictLevel.Suburban)
      regionDeliverFee = priceList.suburban_del_fee
        ? (serviceFee / 100) * priceList.suburban_del_fee
        : 0;

    serviceFee += regionDeliverFee + regionPickFee;

    // load fee
    let loadFee = 0;
    if (payload.loading_type === ELoadType.Both)
      loadFee = (payload.parcel_weight / 1000) * (priceList.load_fee || 0) * 2;

    if (
      payload.loading_type === ELoadType.Pick ||
      payload.loading_type === ELoadType.Deliver
    )
      loadFee = (payload.parcel_weight / 1000) * (priceList.load_fee || 0);

    let insuranceFee = 0;
    const customerConfig = await this.userService.getUserConfig(
      payload.customer_id
    );
    const insuranceValue =
      customerConfig.insurance_value || priceList.insurance_value;
    if (
      payload.is_insured &&
      insuranceValue &&
      payload.parcel_value >= insuranceValue
    ) {
      const insurancePercent =
        customerConfig.insurance_fee || priceList.insurance_fee || 0;
      insuranceFee = (payload.parcel_value / 100) * insurancePercent;
    }

    let codFee = 0;
    serviceFee = Utils.roundByUnit(serviceFee);
    insuranceFee = Utils.roundByUnit(insuranceFee);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    returnFee = Utils.roundByUnit(returnFee);
    regionDeliverFee = Utils.roundByUnit(regionDeliverFee);
    regionPickFee = Utils.roundByUnit(regionPickFee);
    codFee = Utils.roundByUnit(codFee);
    loadFee = Utils.roundByUnit(loadFee);

    // total fee
    let totalFee =
      serviceFee +
      insuranceFee +
      // returnFee +
      codFee +
      loadFee;
    totalFee = Utils.roundByUnit(totalFee);

    return {
      serviceFee,
      insuranceFee,
      returnFee: 0,
      regionPickFee,
      regionDeliverFee,
      codFee,
      loadFee,
      totalFee,
    };
  }

  public calcServiceFee(
    steps: PriceListStep[],
    parcelWeight: number,
    type: EPriceListType
  ) {
    let value = 0;
    if (type === EPriceListType.Retail) {
      steps
        .sort((a, b) => a.from - b.from)
        .forEach((item, index) => {
          if (item.from == 0) item.from = 1;
          if (parcelWeight >= item.from) {
            if (parcelWeight >= item.to) {
              if (index < steps.length - 1)
                value += item.value * (item.to - item.from + 1);
              else value += item.value * (parcelWeight - item.from + 1);
            } else {
              value += item.value * (parcelWeight - item.from + 1);
            }
          }
        });
    } else {
      const range = steps.find(
        (item) => item.from <= parcelWeight && item.to >= parcelWeight
      );

      if (range) value = parcelWeight * range.value;
      else value = parcelWeight * steps[steps.length - 1].value;
    }

    return value;
  }
}
