// ========== Response Types
// import all packages
import { HttpStatus } from '@nestjs/common';

type Errors = Record<string, string[]>;

export interface IResponse<T> {
  statusCode: HttpStatus;
  data?: T | T[];
  errors?: Errors;
}
