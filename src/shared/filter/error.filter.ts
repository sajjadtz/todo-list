/* eslint-disable @typescript-eslint/no-explicit-any */ import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  Inject,
  Logger,
  HttpException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { HttpErrorFilter } from './http-error.filter';
import { BaseException } from '../exceptions/base.exception';
import { CodeError } from '../enum/code-error.enum';
import { MongoServerError } from 'mongodb';

@Catch()
export class ErrorFilter extends HttpErrorFilter {
  constructor() {
    super();
  }

  private logger = new Logger('ErrorFilter');

  catch(error: unknown, host: ArgumentsHost): void {
    let status: number;
    let message: string;
    let fields;
    let source = 'unknown.unknown';

    if ((error as any)?.stack?.split('\n')[1]?.split(' at ')[1]?.split('(')[0])
      source = (error as any).stack
        .split('\n')[1]
        .split(' at ')[1]
        .split('(')[0]
        .trim();
    status = (error as any).status;

    if (error instanceof BaseException) {
      switch (error.code) {
        case CodeError.FORBIDDEN:
          return super.catch(new ForbiddenException(), host);

        case CodeError.NOT_FOUND:
          return super.catch(new NotFoundException(), host);

        case CodeError.UNAUTHORIZED:
          return super.catch(new UnauthorizedException(), host);

        default:
          break;
      }
    } else if (error instanceof MongoServerError) {
      return super.catch(new BadRequestException(error), host);
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }
    const context = host.switchToHttp();

    const response = context.getResponse();
    this.logger.error(error);
    this.logger.error((error as any).stack);
    response.status(status).json({
      serverError: {
        statusCode: status,
        message: message,
        fields: fields,
      },
    });
  }
}
