import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY_NAME as LOCAL_STRATEGY_NAME } from '../local.strategy';
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
}
