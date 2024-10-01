import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'test' })
  username: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'test' })
  password: string;
}
