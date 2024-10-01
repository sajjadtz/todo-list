import { Expose } from 'class-transformer';
import { IUser } from 'src/domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class LoginResponseDto {
  @Expose()
  @ApiProperty({
    type: UserDto,
    example: {
      id: '000000000000000000000000',
      username: 'test',
    },
  })
  user: IUser;

  @Expose()
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IiQyYiQxMCRQZThjMUNZcERlRjMyMWFYcVZVODFPUkxtU2liSW5NLmcwcE11alVmS2lYY1NXM1ovam80RyIsImxpc3RzIjpbXSwiY3JlYXRlZEF0IjoiMjAyNC0xMC0wMVQwNTowNDoxNy43NjlaIiwidXBkYXRlZEF0IjoiMjAyNC0xMC0wMVQwNTowNDoxNy43NjlaIiwiaWQiOiI2NmZiODJkMTQ0ZjEzNTUyZGViYWE3OTQiLCJpYXQiOjE3Mjc3NTkwNjcsImV4cCI6MTcyNzg0NTQ2N30.VYRUERSinXYs-pdxsif_iW5lAw_BAy5LPaHdDuKJYfw',
  })
  accessToken: string;
}
