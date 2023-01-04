import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePickAddressDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  province_id: string;

  @IsString()
  district_id: string;

  @IsString()
  ward_id: string;

  @IsString()
  address_line: string;

  @IsString()
  contact_name: string;

  @IsString()
  phone: string;

  @IsBoolean()
  is_default: boolean;
}
