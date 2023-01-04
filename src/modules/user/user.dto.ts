import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ECommissionType } from 'src/common/enums/commission-type.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email không hợp lệ!' })
  email: string;

  @IsString({ message: 'Tên đăng nhập không hợp lệ!' })
  @MinLength(6, { message: 'Tên đăng nhập phải lớn hơn 6 kí tự' })
  username: string;

  @IsString()
  code: string;

  @ValidateIf((v) => v.length > 0)
  phone: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải dài hơn 6 ký tự.' })
  password: string;

  @IsString()
  assigned_carrier_id: string;

  @IsInt()
  @IsOptional()
  commission: number;

  @IsEnum(ECommissionType)
  @IsOptional()
  commission_type: ECommissionType;

  @IsInt()
  @IsOptional()
  insurance_fee: number;

  @IsInt()
  @IsOptional()
  insurance_value: number;

  @IsBoolean()
  @IsOptional()
  fee_pay_by_shop: boolean;

  @IsBoolean()
  @IsOptional()
  delivery_review: boolean;

  @IsBoolean()
  @IsOptional()
  delivery_test: boolean;

  @IsPositive()
  @IsOptional()
  weigt_factor: number;
}
