import { ITodoList } from '../entities/todo-list.entity';
import { IUser } from '../entities/user.entity';

export interface ITodoListRepository {
  create(data: { todoList: Omit<ITodoList, 'items'> }): Promise<ITodoList>;
  update(data: {
    id: string | number;
    user: IUser;
    title: string;
  }): Promise<ITodoList>;
  delete(data: { id: string | number; user: IUser }): Promise<void>;
}
