import { ITodoList } from './todo-list.entity';

export interface IUser {
  username: string;
  password: string;
  lists: ITodoList[];
}
