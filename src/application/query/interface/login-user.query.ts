import { IQuery } from '@nestjs/cqrs';

export class LoginQuery implements IQuery {
  constructor(
    readonly username: string,
    readonly password: string,
  ) {}
}
