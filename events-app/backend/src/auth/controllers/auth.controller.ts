import { Controller, Post, UseGuards, Get } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { AuthLocalGuard } from '../guards/auth-local.guard';

@Controller('/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(AuthLocalGuard)
  async login(@CurrentUser() user: User) {
  // async login(@Request() request) {
    const userId = user.id;
    const token = this.authService.getTokenForUser(user);
    return { userId, token };
  }
}
