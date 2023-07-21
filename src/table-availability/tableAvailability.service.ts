// ========== Table Availability Service
// import all packages
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IResponse } from 'src/types';
import { TableAvailabilities } from './table.model';
import { CreateAvailableTableDto } from './dto/createAvailableTable.dto';

@Injectable()
export class TableAvailabilityService {
  constructor(
    @InjectModel(TableAvailabilities)
    private tableAvailabilitiesModel: typeof TableAvailabilities,
  ) {}

  public async getAvailableTables(): Promise<IResponse<TableAvailabilities>> {
    try {
      const data = await this.tableAvailabilitiesModel.findAll({
        attributes: ['id', 'table_code', 'is_available'],
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (err) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Server Error',
        errors: {
          database: err.message,
        },
      };
    }
  }

  public async createAvailableTable(
    dto: CreateAvailableTableDto,
  ): Promise<IResponse<TableAvailabilities>> {
    try {
      const data = await this.tableAvailabilitiesModel.findOne({
        where: { table_code: dto.table_code },
      });

      if (data === null) {
        await this.tableAvailabilitiesModel.create({
          table_code: dto.table_code,
          capacity: dto.capacity,
          location: dto.location,
          isAvailable: dto.isAvailable,
        });

        return {
          statusCode: HttpStatus.CREATED,
          message: 'Success',
        };
      }

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed',
        errors: {
          table_code: ['table_code is duplicate'],
        },
      };
    } catch (err) {
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
