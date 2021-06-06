import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    LocalStrategy,
  ],
})
export class AuthModule {}
