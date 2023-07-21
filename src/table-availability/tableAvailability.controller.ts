// ========= Table Availability Controller
// import all packages
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TableAvailabilityService } from './TableAvailability.service';
import { IResponse } from '../../src/types';
import { CreateAvailableTableDto } from './dto/createAvailableTable.dto';
import { Table } from './table.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Table Availability')
@Controller('v1/table-availability')
export class TableAvailabilityController {
  constructor(
    private readonly tableAvailabilityService: TableAvailabilityService,
  ) {}

  @Get()
  public async getAvailableTables(): Promise<IResponse<Table>> {
    return this.tableAvailabilityService.getAvailableTables();
  }

  @Post()
  public async createAvailableTables(
    @Body() dto: CreateAvailableTableDto,
  ): Promise<IResponse<Table>> {
    return this.tableAvailabilityService.createAvailableTable(dto);
  }
}
