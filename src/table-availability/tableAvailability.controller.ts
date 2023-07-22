// ========= Table Availability Controller
// import all packages
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TableAvailabilityService } from './TableAvailability.service';
import { IResponse } from '../../src/types';
import { CreateAvailableTableDto } from './dto/createAvailableTable.dto';
import { TableAvailabilities } from './tableAvailabilities.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateTableAvailbilityError,
  CreateTableAvailbilityFailed,
  CreateTableAvailbilitySuccess,
} from './schemas/createTableAvailability.schema';

@ApiTags('Table Availability')
@Controller('v1/table-availability')
export class TableAvailabilityController {
  constructor(
    private readonly tableAvailabilityService: TableAvailabilityService,
  ) {}

  @Get('/')
  public async getAvailableTables(): Promise<IResponse<TableAvailabilities>> {
    return this.tableAvailabilityService.getAvailableTables();
  }

  @ApiResponse({ status: 201, type: CreateTableAvailbilitySuccess })
  @ApiResponse({ status: 400, type: CreateTableAvailbilityFailed })
  @ApiResponse({ status: 500, type: CreateTableAvailbilityError })
  @Post('/')
  public async createAvailableTables(
    @Body() dto: CreateAvailableTableDto,
  ): Promise<IResponse<TableAvailabilities>> {
    return this.tableAvailabilityService.createAvailableTable(dto);
  }

  @Get('/reservation/:tableId')
  public async getTableReservation(
    @Param('tableId', ParseUUIDPipe) tableId: string,
  ): Promise<IResponse<TableAvailabilities>> {
    return this.tableAvailabilityService.getTableReservation(tableId);
  }
}
