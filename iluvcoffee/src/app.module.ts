import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TYPEORM_OPTIONS } from './config';
import { AppController } from './app.controller';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_OPTIONS),
    CoffeesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
