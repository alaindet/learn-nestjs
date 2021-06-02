import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // One validation group is used if setting a global pipe
  // Multiple validation groups can be used for the same validators if not
  // setting the global pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
