// ========= Reservation Service
// import all packages
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

// import all models
import { Reservation } from './reservation.model';
import { TableAvailabilities } from '../table-availability/tableAvailabilities.model';
import { BookedTable } from './bookedTable.model';

// import types
import { IResponse } from '../types';

// import dto
import { CreateReservationDto } from './dto/createReservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    private readonly sequelize: Sequelize,

    @InjectModel(Reservation)
    private readonly reservationModel: typeof Reservation,

    @InjectModel(TableAvailabilities)
    private readonly tableAvailabilitiesModel: typeof TableAvailabilities,

    @InjectModel(BookedTable)
    private readonly bookedTableModel: typeof BookedTable,
  ) {}

  public async createReservation(
    dto: CreateReservationDto,
  ): Promise<IResponse<Reservation>> {
    const transaction = await this.sequelize.transaction();

    try {
      const reservation = await this.reservationModel.findOne({
        include: [
          {
            model: TableAvailabilities,
            where: {
              id: dto.table_id,
            },
          },
        ],
      });

      if (reservation === null) {
        const result = await this.reservationModel.create({
          first_name: dto.first_name,
          last_name: dto.last_name,
          phone_number: dto.phone_number,
          email: dto.email,
        });

        for (const item of dto.table_id) {
          await Promise.all([
            this.bookedTableModel.create({
              table_id: item,
              reservation_id: result.id,
            }),
            this.tableAvailabilitiesModel.update(
              {
                is_available: false,
              },
              { where: { id: item }, individualHooks: true },
            ),
          ]);
        }

        await transaction.commit();
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Success',
          data: result,
        };
      }

      await transaction.rollback();
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed',
        errors: {
          table_id: ['table id is duplicate'],
        },
      };
    } catch (err) {
      await transaction.rollback();
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Server Error',
        errors: {
          database: [err.message],
        },
      };
    }
  }

  public async deleteReservation(
    reservationId: string,
  ): Promise<IResponse<Reservation>> {
    const transaction = await this.sequelize.transaction();

    try {
      const reservation = await this.bookedTableModel.findOne({
        where: {
          reservation_id: reservationId,
        },
      });

      if (reservation !== null) {
        await Promise.all([
          this.reservationModel.destroy({
            where: {
              id: reservationId,
            },
            individualHooks: true,
          }),
          this.tableAvailabilitiesModel.update(
            {
              is_available: true,
            },
            {
              where: {
                id: reservation.table_id,
              },
              individualHooks: true,
            },
          ),
        ]);
        await transaction.commit();

        return {
          statusCode: HttpStatus.OK,
          message: 'Success',
        };
      }

      await transaction.rollback();
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Failed',
        errors: {
          reservationId: ['Reservation id is not found'],
        },
      };
    } catch (err) {
      await transaction.rollback();
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Server Error',
        errors: {
          database: [err.message],
        },
      };
    }
  }
}
