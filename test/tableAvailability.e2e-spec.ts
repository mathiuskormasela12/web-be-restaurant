// ========== Table Availability e2e test
// import all packages
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TableAvailabilityModule } from '../src//table-availability/tableAvailability.module';

describe('TableAvailabilityModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TableAvailabilityModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/v1/table-availability (POST)', () => {
    return request(app.getHttpServer())
      .post('/v1/table-availability')
      .send({ table_code: 'TK-2220' })
      .expect(200)
      .then((response) => {
        const expectedResult = {
          statusCode: 200,
          data: [
            {
              tableCode: 'TF-9938',
              tableAvailability: true,
            },
          ],
        };

        expect(response.body).toEqual(expectedResult);
      });
  });
});
