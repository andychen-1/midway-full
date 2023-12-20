import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: ['z*e%,Fy$bzdK1K_'],
  koa: {
    port: 7001,
  },
  session: {
    maxAge: 'session',
  },
  security: {
    csrf: {
      useSession: true,
    },
  },
  passport: {
    session: true,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'midwayfull',
        username: 'root',
        password: '1Qaz@wsx',
        synchronize: false,
        logging: true,
        entities: ['**/entities/*.entity{.ts,.js}'],
      },
    },
  },
  vitessr: {
    prefix: '/',
    root: 'web',
    prod: {
      dist: 'dist',
      client: 'client',
    },
    dev: {
      devServerOpts: {
        server: {
          middlewareMode: true,
        },
        appType: 'custom',
      },
    },
    staticOpts: { index: false },
  },
} as MidwayConfig;
