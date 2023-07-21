// ========== Main
// import all packages
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import compression from '@fastify/compress';
import fastifyCsrf from '@fastify/csrf-protection';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  // Setup Helmet
  await app.register(helmet);

  // Setup Compression
  await app.register(compression);

  // Setup Csrf
  await app.register(fastifyCsrf);

  const port: number = app.get(ConfigService).get<number>('SERVICE_PORT');
  const whiteList: string[] = app
    .get(ConfigService)
    .get<string>('SERVICE_CLIENTS')
    .split(',');

  // Setup Cors
  app.enableCors({
    origin: whiteList,
  });

  // Setup Base Url
  app.setGlobalPrefix('/api');

  // Setup Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Setup Swagger UI
  const config = new DocumentBuilder()
    .setTitle('Konexi Restaurant')
    .setDescription('RESTful API Documentation ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
  Logger.log(`The RESTful API is being run at http://localhost:${port}`);
}

bootstrap();
