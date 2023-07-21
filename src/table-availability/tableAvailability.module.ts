// ========== Table Availability Module
// import all packages
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TableAvailabilityController } from './tableAvailability.controller';
import { TableAvailabilityService } from './TableAvailability.service';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { ValidationPipe } from '../pipes/validation.pipe';
import { SequelizeModule } from '@nestjs/sequelize';

// import all tables
import { Table } from './table.model';

@Module({
  imports: [SequelizeModule.forFeature([Table])],
  controllers: [TableAvailabilityController],
  providers: [
    // Setup Transform Interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },

    // Setup Validation Pipe
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    TableAvailabilityService,
  ],
})
export class TableAvailabilityModule {}
