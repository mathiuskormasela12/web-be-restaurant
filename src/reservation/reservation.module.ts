// ========== Reservation Module
// import all packages
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { ValidationPipe } from '../pipes/validation.pipe';

// import models
import { Reservation } from './reservation.model';
import { TableAvailabilities } from '../table-availability/tableAvailabilities.model';
import { BookedTable } from './bookedTable.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Reservation, TableAvailabilities, BookedTable]),
  ],
  controllers: [ReservationController],
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

    ReservationService,
  ],
})
export class ReservationModule {}
