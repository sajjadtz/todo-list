import { Expose } from 'class-transformer';
import { ITodoListItem } from 'src/domain/entities/todo-list-item.entity';
import { IUser } from 'src/domain/entities/user.entity';

export class TodoDto {
  @Expose()
  title: string;

  @Expose()
  user: IUser;

  @Expose()
  items: ITodoListItem[];
}
