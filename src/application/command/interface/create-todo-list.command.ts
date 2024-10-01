import { ICommand } from '@nestjs/cqrs';
import { ITodoList } from 'src/domain/entities/todo-list.entity';

export class CreateTodoListCommand implements ICommand {
  constructor(readonly todoList: Omit<ITodoList, 'items'>) {}
}
