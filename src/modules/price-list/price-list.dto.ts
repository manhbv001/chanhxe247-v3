import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { EDistrictLevel } from 'src/common/enums/district-level.enum';
import { ELoadType } from 'src/common/enums/load-type.enum';
import { EPriceListType } from 'src/common/enums/price-list-type.enum';
import { EReturnFeeUnit } from 'src/common/enums/return-fee-unit.enum';
import { PriceListStep } from './price-list-step.entity';

export class CreatePriceListDto {
  @IsString()
  name: string;

  @IsEnum(EPriceListType)
  type: EPriceListType;

  @IsNumber()
  suburban_pick_fee: number;

  @IsNumber()
  country_pick_fee: number;

  @IsNumber()
  suburban_del_fee: number;

  @IsNumber()
  country_del_fee: number;

  @IsNumber()
  load_fee: number;

  @IsEnum(EReturnFeeUnit)
  return_fee_unit: EReturnFeeUnit;

  @IsNumber()
  return_fee_value: number;

  @IsNumber()
  insurance_fee: number;

  @IsNumber()
  insurance_value: number;

  @IsString()
  from_region_id: string;

  @IsString()
  to_region_id: string;

  @IsArray()
  steps: PriceListStep[];

  @IsNumber()
  min_value: number;

  @IsNumber()
  lead_time: number;

  @IsArray()
  applied_customer_ids: string[];

  @IsArray()
  assigned_carrier_ids?: string[];
}

export class CalcPriceDto {
  price_list_id: string;
  parcel_weight: number;
  parcel_value: number;
  is_insured: boolean;
  loading_type?: ELoadType;
  customer_id: string;
  from_district_level: EDistrictLevel;
  to_district_level: EDistrictLevel;
}
