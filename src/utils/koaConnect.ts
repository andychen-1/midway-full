import { NextFunction, Context } from '@midwayjs/koa';
import { Connect as ViteConnect } from 'vite';

const noop = () => {};

function noCallbackHandler(
  ctx: Context,
  connMiddleware: ViteConnect.Server,
  next: NextFunction
): Promise<void> {
  connMiddleware(ctx.req, ctx.res, noop);
  return next();
}

function withCallbackHandler(
  ctx: Context,
  connMiddleware: ViteConnect.Server,
  next: NextFunction
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    connMiddleware(ctx.req, ctx.res, (err?: unknown) => {
      if (err) reject(err);
      else resolve(next());
    });
  });
}

function koaConnect(connMiddleware: ViteConnect.Server) {
  const handler =
    connMiddleware.length < 3 ? noCallbackHandler : withCallbackHandler;
  return (ctx: Context, next: NextFunction) => {
    return handler(ctx, connMiddleware, next);
  };
}

export default koaConnect;
