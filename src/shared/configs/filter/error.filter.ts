/* eslint-disable @typescript-eslint/no-explicit-any */ import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  Inject,
  Logger,
  HttpException,
} from '@nestjs/common';
import { HttpErrorFilter } from './http-error.filter';

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
    const [sourceClass, sourceMethod] = source?.split('.');
    if (error instanceof HttpException) {
      return super.catch(error, host);
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();

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
