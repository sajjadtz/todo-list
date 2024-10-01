import { CodeError } from '../enum/code-error.enum';
import { BaseException } from './base.exception';

export class UnauthorizedException extends BaseException {
  constructor(err?: Error) {
    super(CodeError.UNAUTHORIZED, 'unauthorized', err);
  }
}
