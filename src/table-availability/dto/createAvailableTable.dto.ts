// ========== Get Available Table Dto
// import all packages
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateAvailableTableDto {
  @ApiProperty({
    type: String,
    title: 'Table Code',
    required: true,
  })
  @IsNotEmpty({ message: 'Table code is required' })
  @IsString({ message: 'Table code should be a string' })
  @IsAlphanumeric('en-US', { message: 'Table code should be an alphanumeric' })
  table_code: string;

  @ApiProperty({
    type: Number,
    title: 'Table Capacity',
    required: true,
    minimum: 1,
  })
  @IsNumber({}, { message: 'Capacity should be a number' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'Capacity is required' })
  @Min(1, { message: 'Capacity should be greater than 0' })
  capacity: number;

  @ApiProperty({
    type: String,
    title: 'Table Location',
    required: true,
  })
  @IsNotEmpty({ message: 'Location is required' })
  @IsString({ message: 'Location should be a string' })
  location: string;

  @ApiProperty({
    type: Boolean,
    title: 'Table Availability',
    required: false,
  })
  @IsNotEmpty({ message: 'isAvailable is required' })
  @IsBoolean({ message: 'isAvailable should be a boolan' })
  isAvailable: boolean;
}
