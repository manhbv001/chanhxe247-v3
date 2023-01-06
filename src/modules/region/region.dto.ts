import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateRegionDto {
  @IsString()
  name: string;

  @IsString()
  short_name: string;

  @Column()
  code: string;

  @IsNumber()
  distance: number;

  @IsString()
  description: string;

  @IsArray()
  province_ids: string[];
}
