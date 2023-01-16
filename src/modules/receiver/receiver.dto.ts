import { IsString } from 'class-validator';

export class CreateReceiverDto {
  @IsString()
  fullname: string;

  @IsString()
  phone: string;

  @IsString()
  province_id: string;

  @IsString()
  district_id: string;

  @IsString()
  ward_id: string;

  @IsString()
  address_line: string;
}
