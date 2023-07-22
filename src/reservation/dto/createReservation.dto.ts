// ========= Create Reservation Dto
// import all packages
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    title: 'Guest First Name',
    type: String,
  })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name should be a string' })
  first_name: string;

  @ApiProperty({
    title: 'Guest Last Name',
    type: String,
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name should be a string' })
  last_name: string;

  @ApiProperty({
    title: 'Guest Email',
    type: String,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @ApiProperty({
    title: 'Guest Phone Number',
    type: String,
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number should be a string' })
  @IsMobilePhone(null, {}, { message: 'Phone number is invalid' })
  phone_number: string;

  @ApiProperty({
    title: 'Table Id',
    type: Array<string>,
  })
  @IsNotEmpty({ message: 'Table is is required' })
  @IsArray({ message: 'Table is should be an array' })
  @IsUUID('4', { each: true, message: 'Table id should be an uuid array' })
  table_id: string[];
}
