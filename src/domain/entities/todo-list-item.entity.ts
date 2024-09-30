import { ITodoList } from './todo-list.entity';

export interface ITodoListItem {
  id?: string | number;
  title: string;
  description: string;
  priority: string;
  todoList: Partial<ITodoList>;
}
