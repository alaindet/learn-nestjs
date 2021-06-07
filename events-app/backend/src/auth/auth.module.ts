import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './services/auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: process.env.AUTH_EXPIRES_IN,
        },
      })
    }),
  ],
  controllers: [
    AuthController,
    UsersController,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
  ],
})
export class AuthModule {}
