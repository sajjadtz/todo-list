import { ITodoListItem } from './todo-list-item.entity';
import { IUser } from './user.entity';

export interface ITodoList {
  title: string;
  user: IUser;
  items: ITodoListItem[];
}
