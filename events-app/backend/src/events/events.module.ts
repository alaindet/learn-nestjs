import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsDemoController } from './controllers/events-demo.controller.';
import { EventsController } from './controllers/events.controller';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [
    EventsController,
    EventsDemoController,
  ],
})
export class EventsModule {}