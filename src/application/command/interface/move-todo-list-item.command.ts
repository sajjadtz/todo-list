import { ICommand } from '@nestjs/cqrs';
import { ITodoListItem } from 'src/domain/entities/todo-list-item.entity';
import { IUser } from 'src/domain/entities/user.entity';

export class MoveTodoListItemCommand implements ICommand {
  constructor(
    readonly id: string | number,
    readonly user: IUser,
    readonly next: ITodoListItem,
  ) {}
}
