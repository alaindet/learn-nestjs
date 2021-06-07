import { AuthGuard } from '@nestjs/passport';

import { STRATEGY_NAME } from '../strategies/local.strategy';

export class AuthLocalGuard extends AuthGuard(STRATEGY_NAME) {
  // ...
}
