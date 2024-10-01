import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoListDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'test' })
  title: string;
}
