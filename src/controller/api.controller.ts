import { Config, Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ParseStringPipe } from '../pipe/parseString.pipe.js';
import { UserService } from '../service/user.service.js';
import { LocalPassportMiddleware } from '../middleware/local.middleware.js';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Config('passport')
  passConfig: any;

  @Inject()
  userService: UserService;

  @Post('/login')
  async login(
    @Body('username', [ParseStringPipe]) username: string,
    @Body('password', [ParseStringPipe]) password: string
  ) {
    const { sessionUserProperty, userProperty } = this.passConfig;
    delete this.ctx.session[sessionUserProperty];

    if (true === (await this.userService.verifyUser(username, password))) {
      this.ctx.session[sessionUserProperty] = { [userProperty]: username };
      this.ctx.rotateCsrfSecret();
      return {
        success: true,
        message: 'OK',
      };
    }
    this.ctx.status = 401;
  }

  @Post('/get_user', { middleware: [LocalPassportMiddleware] })
  async getUser() {
    return this.ctx.state.user;
  }
}
