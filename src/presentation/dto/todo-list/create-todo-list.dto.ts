import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;
}
