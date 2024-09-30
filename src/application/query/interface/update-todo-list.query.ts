import { IQuery } from '@nestjs/cqrs';
import { IUser } from 'src/domain/entities/user.entity';

export class UpdateTodoListQuery implements IQuery {
  constructor(
    readonly id: string | number,
    readonly user: IUser,
    readonly title: string,
  ) {}
}
