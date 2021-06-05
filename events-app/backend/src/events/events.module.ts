import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsDemoController } from './controllers/events-demo.controller.';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/events.service';
import { Event } from './entities/event.entity';
import { Attendee } from './entities/attendee.entity';
import { User } from 'src/auth/user.entity';
import { Profile } from 'src/auth/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      Attendee,
      User,
      Profile,
    ]),
  ],
  controllers: [
    EventsController,
    EventsDemoController,
  ],
  providers: [
    EventsService,
  ],
})
export class EventsModule {}
