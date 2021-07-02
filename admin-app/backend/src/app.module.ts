import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

// TODO: Move to environment
const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'database',
  // host: 'localhost',
  port: 3306,
  username: 'adminapp',
  password: 'adminapp',
  database: 'adminapp',

  // TODO: Do not use these in production
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
