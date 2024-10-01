import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignUpUserDto } from '../dto/user/sign-up-user.dto';
import { SignUpUserCommand } from 'src/application/command/interface/sign-up-user.command';
import { UserDto } from '../dto/user/user.dto';
import { LoginQuery } from 'src/application/query/interface/login-user.query';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { IUser } from 'src/domain/entities/user.entity';
import { CurrentUser } from 'src/shared/decorator/current-user.decorator';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { LoginResponseDto } from '../dto/user/login-response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findByUsername(@CurrentUser() user: IUser): Promise<UserDto> {
    return user;
  }

  @Post('/sign-up')
  async signUp(@Body() user: SignUpUserDto): Promise<void> {
    return await this.commandBus.execute(
      new SignUpUserCommand(user.username, user.password),
    );
  }

  @Post('/login')
  @ApiOkResponse({ type: LoginResponseDto })
  async login(@Body() user: SignUpUserDto): Promise<LoginResponseDto> {
    return await this.queryBus.execute(
      new LoginQuery(user.username, user.password),
    );
  }
}
