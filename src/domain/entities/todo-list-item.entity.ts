import { ITodoList } from './todo-list.entity';

export interface ITodoListItem {
  title: string;
  description: string;
  priority: number;
  todoList: ITodoList;
}
