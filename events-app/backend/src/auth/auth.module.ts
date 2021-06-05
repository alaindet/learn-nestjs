import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  controllers: [
    
  ],
  providers: [
    LocalStrategy,
  ],
})
export class AuthModule {}
