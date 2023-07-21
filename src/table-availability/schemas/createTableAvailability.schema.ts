// ========== Create Table Availability Schema
// import all packages
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTableAvailbilitySuccess {
  @ApiProperty({
    type: Number,
    title: 'HTTP Response Status',
    default: 201,
  })
  statusCode: HttpStatus.CREATED;

  @ApiProperty({
    type: String,
    title: 'Response Message',
    default: 'Success',
  })
  message: string;
}

export class CreateTableAvailbilityFailed {
  @ApiProperty({
    type: Number,
    title: 'HTTP Response Status',
    default: 400,
  })
  statusCode: HttpStatus.BAD_REQUEST;

  @ApiProperty({
    type: String,
    title: 'Response Message',
    default: 'Failed',
  })
  message: string;

  @ApiProperty({
    type: String,
    title: 'Error Messages',
    default: {
      table_code: ['Table code should be an alphanumeric'],
    },
  })
  errors: Record<string, string[]>;
}

export class CreateTableAvailbilityError {
  @ApiProperty({
    type: Number,
    title: 'HTTP Response Status',
    default: 500,
  })
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR;

  @ApiProperty({
    type: String,
    title: 'Response Message',
    default: 'Server Error',
  })
  message: string;

  @ApiProperty({
    type: String,
    title: 'Error Messages',
    default: {
      database: ["Unknown database 'web-be-restaurant'"],
    },
  })
  errors: Record<string, string[]>;
}
