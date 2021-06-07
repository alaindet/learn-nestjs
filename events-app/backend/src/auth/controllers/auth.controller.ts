import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY_NAME as LOCAL_STRATEGY_NAME } from '../strategies/local.strategy';
import { STRATEGY_NAME as JWT_STRATEGY_NAME } from '../strategies/jwt.strategy';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard(LOCAL_STRATEGY_NAME))
  async login(@Request() request) {

    console.log('request.user', request.user);

    const userId = request.user.id;
    const token = this.authService.getTokenForUser(request.user);

    return { userId, token };
  }

  @Get('/profile')
  @UseGuards(AuthGuard(JWT_STRATEGY_NAME))
  async getProfile(@Request() request) {
    return request.user;
  }
}
