import { CodeError } from '../enum/code-error.enum';
import { BaseException } from './base.exception';

export class ForbiddenException extends BaseException {
  constructor(readonly err?: Error) {
    super(CodeError.FORBIDDEN, 'forbidden resource', err);
  }
}
