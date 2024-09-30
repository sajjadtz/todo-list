import { ITodoList } from '../entities/todo-list.entity';
import { IUser } from '../entities/user.entity';

export interface ITodoListRepository {
  findById(id: string | number): Promise<ITodoList>;
  create(data: { todoList: Omit<ITodoList, 'items'> }): Promise<ITodoList>;
  update(data: {
    id: string | number;
    user: IUser;
    title: string;
  }): Promise<ITodoList>;
  delete(data: { id: string | number; user: IUser }): Promise<void>;
  addTodoListItem(data: {
    id: string | number;
    itemId: string | number;
  }): Promise<void>;
  removeTodoListItem(data: {
    id: string | number;
    itemId: string | number;
  }): Promise<void>;
}
