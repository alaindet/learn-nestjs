import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-local';

import { User } from '../entities/user.entity';

export const STRATEGY_NAME = 'local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY_NAME) {

  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  public async validate(username: string, password: string): Promise<any> {

    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      this.logger.debug(`User ${username} not found`);
      throw new UnauthorizedException();
    }

    // TODO: Hash compare?
    if (password !== user.password) {
      this.logger.debug(`Invalid credentials for user ${username}`);
    }

    return user;
  }
}
