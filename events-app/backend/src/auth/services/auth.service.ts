import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  public getTokenForUser(user: User): string {
    // TODO: Just put a user session ID as a custom claim
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }
}
