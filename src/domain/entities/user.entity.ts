import { ITodoList } from './todo-list.entity';

export interface IUser {
  id?: string | number;
  username: string;
  password: string;
  lists: ITodoList[];
}
