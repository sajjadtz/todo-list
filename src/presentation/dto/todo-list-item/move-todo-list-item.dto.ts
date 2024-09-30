import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MoveTodoItemDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  prevPriority?: string;
}
