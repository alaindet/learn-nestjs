import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TYPEORM_CONFIG } from './config/typeorm.config';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AppItalianService } from './app-italian.service';
import { EventsModule } from './events/events.module';
import { AppDummy } from './app-dummy';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    EventsModule,
  ],
  controllers: [AppController],

  // providers: [AppService],
  // Equivalent to
  // providers: [
  //   {
  //     provide: AppService,
  //     useClass: AppService,
  //   }
  // ]
  // Provider types: class, value, factory

  providers: [
    // Leave the same token, but use another class implementing the same interface
    {
      provide: AppService,
      useClass: AppItalianService,
    },
    // Inject a non-class
    {
      provide: 'APP_NAME',
      useValue: 'Events App',
    },
    {
      provide: 'DUMMY_MESSAGE',
      // Same as Angular's deps array
      inject: [AppDummy],
      useFactory: (appDummy: AppDummy) => {
        console.log('DUMMY_MESSAGE token being created');
        return `Factory: ${appDummy.getDummy()}`;
      },
    },
    {
      provide: AppDummy,
      useClass: AppDummy,
    },
  ],
})
export class AppModule {}
