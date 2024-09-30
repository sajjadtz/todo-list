import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateTodoItemDto } from './update-todo-list-item.dto';

export class CreateTodoItemDto extends UpdateTodoItemDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  todoListId: string;
}
