// ========== Table Availability Service
// import all packages
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IResponse } from 'src/types';
import { Table } from './table.model';
import { CreateAvailableTableDto } from './dto/createAvailableTable.dto';

@Injectable()
export class TableAvailabilityService {
  constructor(@InjectModel(Table) private tableModel: typeof Table) {}

  public async getAvailableTables(): Promise<IResponse<Table>> {
    try {
      const data = await this.tableModel.findAll();

      return {
        statusCode: HttpStatus.OK,
        data: data,
      };
    } catch (err) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: {
          database: err.message,
        },
      };
    }
  }

  public async createAvailableTable(
    dto: CreateAvailableTableDto,
  ): Promise<IResponse<Table>> {
    try {
      const data = await this.tableModel.findOne({
        where: { table_code: dto.table_code },
      });

      if (data === null) {
        await this.tableModel.create({
          table_code: dto.table_code,
          capacity: dto.capacity,
          location: dto.location,
          isAvailable: dto.isAvailable,
        });

        return {
          statusCode: HttpStatus.CREATED,
        };
      }

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        errors: {
          table_code: ['table_code already in used'],
        },
      };
    } catch (err) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: {
          database: [err.message],
        },
      };
    }
  }
}
