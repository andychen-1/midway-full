import '@midwayjs/core';
import { InlineConfig } from 'vite';
import * as serve from 'koa-static';

import { koaCompress } from './types/koa-compress.js';

export namespace vitessr {
  export interface DevOptions {
    /**
     * 源码目录，相对于 {root}
     */
    src?: string;
    /**
     * vite 调试服务选项
     */
    devServerOpts?: DevServerOptions;
  }

  export interface ProdOptions {
    /**
     * 编译输出目录，默认 dist， 路径：{root}/{dist}
     */
    dist?: string;
    /**
     * 客户端构建输出目录 默认 client，路径：{root}/{dist}/{client}
     */
    client?: string;
    /**
     * 服务端构建输出目录 默认 server，路径：{root}/{dist}/{server}
     */
    server?: string;
  }

  export type DevServerOptions = InlineConfig;

  export type StaticOptions = serve.Options;

  export type RenderData = {
    /**
     * 页面标题
     */
    title?: string;
    /**
     * 页面描述
     */
    description?: string;
    /**
     * csrf 漏洞防御信令
     */
    csrfToken?: string;
    /**
     * csrfToken 名称
     */
    csrfTokenName?: string;
    /**
     * 其他增量的渲染数据
     */
    [key: string]: any;
  };

  export interface Options {
    /**
     * vite ssr 项目访问路径 默认 '/'
     */
    prefix?: string;
    /**
     * vite ssr 项目目录 默认 'web'，相对于 appDir
     */
    root?: string;
    /**
     *  SSR 生产配置
     */
    prod?: ProdOptions;
    /**
     *  SSR 开发配置
     */
    dev?: DevOptions;
    /**
     * 静态文件中间件选项
     */
    staticOpts?: StaticOptions;
    /**
     * 通信压缩选项
     */
    compressOptions?: koaCompress.Options;
  }
}

declare module '@midwayjs/core/dist/interface.js' {
  interface MidwayConfig {
    vitessr?: vitessr.Options;
  }
}

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  userId: string;
  pwdHash?: string;
}

export interface IRedirectRecorderOpts {
  loginPage?: string;
  refererName?: string;
  returnUrl?: string;
}
