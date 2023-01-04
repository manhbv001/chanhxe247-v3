import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  id: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;
}
