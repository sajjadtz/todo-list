import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  UnprocessableEntityException,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { ValidationError, isString } from "class-validator";

function flattenError(error: ValidationError): ValidationError[] {
  if (!error.children || error.children.length === 0) {
    return [error];
  }
  const property = error.property;
  let errors: ValidationError[] = [];
  for (const error_ of error.children) {
    errors.push(...flattenError(error_));
    error_.children = undefined;
  }
  errors = errors.map((er) => {
    er.property = `${property}.${er.property}`;
    return er;
  });
  return errors;
}

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse();
    const status = exception.getStatus();

    switch (exception?.constructor) {
      case UnprocessableEntityException: {
        response.status(status).json({
          serverError: {
            statusCode: status,
            message: exception.getResponse(),
          },
        });
        break;
      }
      default: {
        response
          .status(
            exception instanceof BadRequestException &&
              exception.message.includes("E11000")
              ? HttpStatus.CONFLICT
              : status
          )
          .json({
            serverError: {
              statusCode:
                exception instanceof BadRequestException &&
                exception.message.includes("E11000")
                  ? 409
                  : status,
              message: exception.message,
            },
          });
        break;
      }
    }
  }
}
