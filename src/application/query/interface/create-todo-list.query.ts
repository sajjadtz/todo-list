import { IQuery } from '@nestjs/cqrs';
import { ITodoList } from 'src/domain/entities/todo-list.entity';

export class CreateTodoListQuery implements IQuery {
  constructor(readonly todoList: Omit<ITodoList, 'items'>) {}
}
