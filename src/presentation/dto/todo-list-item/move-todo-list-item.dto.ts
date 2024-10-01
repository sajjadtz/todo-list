import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MoveTodoItemDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: String, example: 'test' })
  prevPriority?: string;
}
