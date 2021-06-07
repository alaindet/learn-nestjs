import { AuthGuard } from '@nestjs/passport';

import { STRATEGY_NAME } from '../strategies/jwt.strategy';

export class AuthJwtGuard extends AuthGuard(STRATEGY_NAME) {
  // ...
}
