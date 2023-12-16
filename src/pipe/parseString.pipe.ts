import { Pipe } from '@midwayjs/core';
import { ParsePipe, RuleType } from '@midwayjs/validate';
import Joi from 'joi';

@Pipe()
export class ParseStringPipe extends ParsePipe {
  getSchema(): RuleType.AnySchema<any> {
    return Joi.string().required();
  }
}
