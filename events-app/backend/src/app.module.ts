import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events.controller';
import { Event } from './event.entity';

@Module({
  imports: [
    // TODO: Move to .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'events-app',
      // TODO: Auto-load of entities
      entities: [
        Event,
      ],
      // TODO: Disable in production  
      // synchronize: true,
      synchronize: false,
    }),
  ],
  controllers: [
    AppController,
    EventsController,
  ],
  providers: [AppService],
})
export class AppModule {}
