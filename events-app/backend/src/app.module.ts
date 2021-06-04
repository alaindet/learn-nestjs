import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import typeOrmConfigDev from './config/typeorm.config.dev';
import typeOrmConfigProd from './config/typeorm.config.prod';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AppItalianService } from './app-italian.service';
import { EventsModule } from './events/events.module';
import { SchoolModule } from './school/school.module';
import { AppDummy } from './app-dummy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // envFilePath: '.env', // Default
      // ignoreEnvFile: true, // If using Docker to containerize this app
      load: [
        typeOrmConfigDev,
        typeOrmConfigProd,
      ],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV === 'production'
        ? typeOrmConfigDev
        : typeOrmConfigProd
    }),
    EventsModule,
    SchoolModule,
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
