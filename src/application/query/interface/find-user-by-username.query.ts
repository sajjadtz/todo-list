import { IQuery } from '@nestjs/cqrs';

export class FindUserByUsernameQuery implements IQuery {
  constructor(readonly username: string) {}
}
