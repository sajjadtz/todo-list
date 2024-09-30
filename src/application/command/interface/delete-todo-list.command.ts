import { ICommand } from '@nestjs/cqrs';
import { IUser } from 'src/domain/entities/user.entity';

export class DeleteTodoListCommand implements ICommand {
  constructor(
    readonly id: string | number,
    readonly user: IUser,
  ) {}
}
