import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TYPEORM_CONFIG } from './config/typeorm.config';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { EventsController } from './events.controller';
import { Event } from './event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [
    AppController,
    EventsController,
  ],
  providers: [AppService],
})
export class AppModule {}
