import { ITodoListItem } from './todo-list-item.entity';
import { IUser } from './user.entity';

export interface ITodoList {
  id?: string | number;
  title: string;
  user: Partial<IUser>;
  items: ITodoListItem[];
}
