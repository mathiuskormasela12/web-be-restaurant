// ========= Reservation Controller
// import all packages
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';

// import types
import { IResponse } from '../types';

// import models
import { Reservation } from './reservation.model';

// import dto
import { CreateReservationDto } from './dto/createReservation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reservation')
@Controller('v1/reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('/')
  public async createReservation(
    @Body() dto: CreateReservationDto,
  ): Promise<IResponse<Reservation>> {
    return this.reservationService.createReservation(dto);
  }

  @Delete('/:reservationId')
  public async deleteReservation(
    @Param('reservationId', ParseUUIDPipe) reservationId: string,
  ): Promise<IResponse<Reservation>> {
    return this.reservationService.deleteReservation(reservationId);
  }
}
