import { Expose } from 'class-transformer';
import { ITodoListItem } from 'src/domain/entities/todo-list-item.entity';
import { IUser } from 'src/domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user/user.dto';

export class TodoListDto {
  @Expose()
  @ApiProperty({ type: String, example: 'test' })
  title: string;

  @Expose()
  @ApiProperty({ type: UserDto, example: { id: '000000000000000000000000' } })
  user: IUser;

  @Expose()
  @ApiProperty({ type: Object, example: [] })
  items: ITodoListItem[];
}
