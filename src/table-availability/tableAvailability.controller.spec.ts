// ========== Table Availability Test
// import all packages
import { Test, TestingModule } from '@nestjs/testing';
import { TableAvailabilityController } from './tableAvailability.controller';
import { TableAvailabilityService } from './TableAvailability.service';

describe('TableAvailabilityController', () => {
  let tableAvailabilityController: TableAvailabilityController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TableAvailabilityController],
      providers: [TableAvailabilityService],
    }).compile();

    tableAvailabilityController = app.get<TableAvailabilityController>(
      TableAvailabilityController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const expectedResult = {
        statusCode: 200,
        data: [
          {
            tableCode: 'TF-9938',
            tableAvailability: true,
          },
        ],
      };

      expect(tableAvailabilityController.getAvailableTables()).toEqual(
        expectedResult,
      );
    });
  });
});
