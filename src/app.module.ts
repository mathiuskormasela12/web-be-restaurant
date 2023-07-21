// ========== App Module
// import all packages
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { SequelizeModule } from '@nestjs/sequelize';
import { TableAvailabilityModule } from './table-availability/tableAvailability.module';

// import models
import { Table } from './table-availability/table.model';

@Module({
  imports: [
    // Setup Config Module
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Setup Rate Limiter
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('SERVICE_RATE_LIMITER_TTL'),
        limit: config.get<number>('SERVICE_RATE_LIMITER_LIMIT'),
      }),
    }),

    // Setup Sequelize
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('SERVICE_DB_HOST'),
        port: configService.get<number>('SERVICE_DB_PORT'),
        username: configService.get<string>('SERVICE_DB_USER'),
        password: configService.get<string>('SERVICE_DB_PASSWORD'),
        database: configService.get<string>('SERVICE_DB_NAME'),
        models: [Table],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),

    // Define All Applications Here...
    TableAvailabilityModule,
  ],
})
export class AppModule {}
