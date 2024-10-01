import { CodeError } from '../enum/code-error.enum';
import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(readonly err?: Error) {
    super(CodeError.NOT_FOUND, 'not found', err);
  }
}
