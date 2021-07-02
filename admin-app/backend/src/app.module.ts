import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

// TODO: Move to environment
const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'database',
  port: 3306,
  username: 'root',
  password: 'root',
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
