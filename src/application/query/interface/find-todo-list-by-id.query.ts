import { IQuery } from '@nestjs/cqrs';
import { IUser } from 'src/domain/entities/user.entity';

export class FindTodoListByIdQuery implements IQuery {
  constructor(
    readonly id: string,
    readonly user: IUser,
  ) {}
}
