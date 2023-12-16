import { Provide } from '@midwayjs/core';
import {
  App,
  Config,
  Inject,
  MidwayWebRouterService,
  FileUtils,
  Singleton,
} from '@midwayjs/core';
import { Application, Context } from '@midwayjs/koa';
import koaStatic from 'koa-static';
import mount from 'koa-mount';
import { resolve as _resolve } from 'path';
import { renderPage } from 'vike/server';
import koaCompress from 'koa-compress';

import koaConnect from '../utils/koaConnect.js';
import { DirectoryNotFoundError } from '../error.js';
import { vitessr } from '../interface.js';

@Provide()
@Singleton()
export class ServerSideRenderService {
  @App()
  private app: Application;

  @Inject()
  private webRouterService: MidwayWebRouterService;

  @Config('vitessr')
  private config: vitessr.Options;

  private vite = null;

  async startup() {
    const { app, config } = this;

    const isProd = this.app.getEnv() === 'production';
    const resolvePath = (p: string) => _resolve(app.getAppDir(), p);
    const { prefix, root, staticOpts }: vitessr.Options = config;
    let fnSSRMiddleware: any;

    if (isProd) {
      const { dist, client } = config.prod;
      const clientOutDir = `${root}@${dist}/${client}`;
      const staticPath = resolvePath(clientOutDir);
      const isExists = await FileUtils.exists(staticPath);
      if (!isExists) {
        throw new DirectoryNotFoundError(staticPath);
      }
      fnSSRMiddleware = mount(prefix, koaStatic(staticPath, staticOpts));
    } else {
      const { createServer } = await import('vite');
      const { devServerOpts } = config.dev;
      devServerOpts.root = config.root;
      this.vite = await createServer(devServerOpts);
      fnSSRMiddleware = koaConnect(this.vite.middlewares);
    }

    // getMiddleware().insertFirst([,fnSSRMiddleware])的作用是插入中间件到队首
    // 这是koa洋葱模型的最外层中间件，最先接收请求，优先处理响应结果
    // 对于一些无需验证的静态资源来说，可以通过此方法绕过 passport 中间件的登陆重定向处理。
    // 在开发模式下，静态资源中间件对应 vite.middlewares
    // 生产模式则是 koaStatic，默认指向 web@dist/client 目录
    fnSSRMiddleware._name = 'SSRMiddleware';
    app
      .getMiddleware()
      .insertFirst([koaCompress(config.compressOptions), fnSSRMiddleware]);

    const all = async (ctx: Context) => {
      const pageContextInit = {
        urlOriginal: ctx.originalUrl,
        user: ctx.session.user,
        csrfToken: ctx.csrf || '',
      };
      const pageContext = await renderPage(pageContextInit);
      const { httpResponse } = pageContext;
      if (httpResponse) {
        const { body, statusCode, headers } = httpResponse;
        headers.forEach(([name, value]) => ctx.res.setHeader(name, value));
        ctx.status = statusCode;
        ctx.body = body;
      }
    };

    // 模糊匹配的路由优先等级低于精确匹配的路由。
    this.webRouterService.addRouter(all, {
      url: '/*',
      requestMethod: 'GET',
    });
  }

  stop() {
    if (this.vite) {
      return this.vite.close();
    }
  }
}
