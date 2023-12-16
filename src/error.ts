import { registerErrorCode, MidwayError } from '@midwayjs/core';

export const ViteSSRErrorEnum = registerErrorCode('vitessr', {
  DIRECTORY_NOT_EXISTS: 20000,
  ERROR_FOR_DEV_RANDER: 20001,
  ERROR_FOR_PROD_RANDER: 20002,
  ERROR_FOR_TEMPLATE_RANDER: 20003,
} as const);

export class DirectoryNotFoundError extends MidwayError {
  constructor(p: string) {
    super(
      `Path ${p} not exist, please check it.`,
      ViteSSRErrorEnum.DIRECTORY_NOT_EXISTS
    );
  }
}

export class DevRenderError extends MidwayError {
  constructor(p: string) {
    super(p, ViteSSRErrorEnum.ERROR_FOR_DEV_RANDER);
  }
}

export class ProdRenderError extends MidwayError {
  constructor(p: string) {
    super(p, ViteSSRErrorEnum.ERROR_FOR_PROD_RANDER);
  }
}

export class TemplateRenderError extends MidwayError {
  constructor(p: string) {
    super(p, ViteSSRErrorEnum.ERROR_FOR_TEMPLATE_RANDER);
  }
}
