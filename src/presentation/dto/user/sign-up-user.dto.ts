import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}
