import { ITodoListItem } from '../entities/todo-list-item.entity';
import { IUser } from '../entities/user.entity';

export interface ITodoListItemRepository {
  create(data: {
    todoListItem: Omit<ITodoListItem, 'priority'>;
    user: IUser;
  }): Promise<void>;
  update(data: {
    id: string | number;
    user: IUser;
    title: string;
    description: string;
  }): Promise<void>;
  delete(data: { id: string | number; user: IUser }): Promise<void>;
  move(data: {
    id: string | number;
    user: IUser;
    next: ITodoListItem;
  }): Promise<void>;
}
