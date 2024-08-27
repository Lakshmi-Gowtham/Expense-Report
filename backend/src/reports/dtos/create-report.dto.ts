import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  totalPrice: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;
}
