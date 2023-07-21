// ========== Get Available Table Dto
// import all packages
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateAvailableTableDto {
  @IsNotEmpty({ message: 'Table code is required' })
  table_code: string;

  @IsNumber({}, { message: 'Capacity should be a number' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'Capacity is required' })
  @Min(1, { message: 'Capacity should be greater than 0' })
  capacity: number;

  @IsNotEmpty({ message: 'Location is required' })
  @IsString({ message: 'Location should be a string' })
  location: string;

  @IsNotEmpty({ message: 'isAvailable is required' })
  @IsBoolean({ message: 'isAvailable should be a boolan' })
  isAvailable: boolean;
}
