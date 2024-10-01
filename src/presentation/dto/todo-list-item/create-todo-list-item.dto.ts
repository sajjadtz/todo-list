import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateTodoItemDto } from './update-todo-list-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoItemDto extends UpdateTodoItemDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '000000000000000000000000' })
  todoListId: string;
}
