import { Configuration, App, Inject } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as security from '@midwayjs/security';
import * as passport from '@midwayjs/passport';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/typeorm';
import { ReportMiddleware } from './middleware/report.middleware.js';
import DefaultConfig from './config/config.default.js';
import UnittestConfig from './config/config.unittest.js';

import { ServerSideRenderService } from './service/serverSideRender.service.js';

@Configuration({
  imports: [
    koa,
    security,
    passport,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    orm,
  ],
  importConfigs: [
    {
      default: DefaultConfig,
      unittest: UnittestConfig,
    },
  ],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  @Inject()
  serverSideRenderService: ServerSideRenderService;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);

    await this.serverSideRenderService.startup();
  }

  async onStop() {
    await this.serverSideRenderService.stop();
  }
}
