import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY_NAME as LOCAL_STRATEGY_NAME } from '../local.strategy';

@Controller('/auth')
export class AuthController {

  @Post('/login')
  @UseGuards(AuthGuard(LOCAL_STRATEGY_NAME))
  async login(@Request() request) {

    console.log('request.user', request.user);

    const userId = request.user.id;
    const token = '...';

    return { userId, token };
  }
}
