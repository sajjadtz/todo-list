import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/domain/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IUser => {
    const request = context.switchToHttp().getRequest();
    return request.user ? request.user : undefined;
  },
);
