import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-local';
import { Inject } from '@midwayjs/core';

import { UserService } from '../service/user.service.js';

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject()
  userService: UserService;

  validate(payload: any) {
    return payload;
  }

  getStrategyOptions(): any {
    return {};
  }

  serializeUser(user: any, done: any) {
    done(null, user?.userId);
  }

  deserializeUser(id: any, done: any) {
    this.userService
      .getUser({ userId: id })
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
  }
}
