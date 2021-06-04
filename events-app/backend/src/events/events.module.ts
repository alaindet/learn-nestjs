import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsDemoController } from './controllers/events-demo.controller.';
import { EventsController } from './controllers/events.controller';
import { Event } from './entities/event.entity';
import { Attendee } from './entities/attendee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      Attendee,
    ]),
  ],
  controllers: [
    EventsController,
    EventsDemoController,
  ],
})
export class EventsModule {}
