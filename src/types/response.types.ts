// ========== Response Types
// import all packages
import { HttpStatus } from '@nestjs/common';

type Errors = Record<string, string[]>;

export interface IResponse<T> {
  statusCode: HttpStatus;
  message: string;
  data?: T | T[];
  errors?: Errors;
}
