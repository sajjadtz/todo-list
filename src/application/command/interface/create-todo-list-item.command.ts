import { ICommand } from '@nestjs/cqrs';
import { ITodoListItem } from 'src/domain/entities/todo-list-item.entity';
import { IUser } from 'src/domain/entities/user.entity';

export class CreateTodoListItemCommand implements ICommand {
  constructor(
    readonly todoListItem: Omit<ITodoListItem, 'todoList' | 'priority'>,
    readonly todoListId: string,
    readonly user: IUser,
  ) {}
}
