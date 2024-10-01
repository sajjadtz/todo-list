import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { error } from 'console';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const status = exception.getStatus();

    response
      .status(
        exception instanceof BadRequestException &&
          exception.message.includes('E11000')
          ? HttpStatus.CONFLICT
          : status,
      )
      .json(exception.getResponse());
  }
}
