import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ELoadType } from 'src/common/enums/load-type.enum';

export class CreateShipmentDto {
  @IsString()
  price_list_id: string;

  @IsString()
  carrier_id: string;

  @IsString()
  pick_address_id: string;

  @IsString()
  parcel_name: string;

  @IsNumber()
  parcel_value: number;

  @IsNumber()
  parcel_quantity: number;

  @IsNumber()
  parcel_width: number;

  @IsNumber()
  parcel_height: number;

  @IsNumber()
  parcel_length: number;

  @IsNumber()
  parcel_weight: number;

  @IsOptional()
  @IsString()
  parcel_note: string;

  @IsBoolean()
  @IsOptional()
  is_insured: boolean;

  @IsEnum(ELoadType)
  @IsOptional()
  loading_type: ELoadType;

  @IsNumber()
  cod_amount: number;

  @IsString()
  receiver_name: string;

  @IsString()
  receiver_phone: string;

  @IsString()
  receiver_province_id: string;

  @IsString()
  receiver_district_id: string;

  @IsString()
  receiver_ward_id: string;

  @IsString()
  receiver_address_line: string;

  @IsString()
  customer_id: string;
}
