import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { LoginQuery } from '../interface/login-user.query';
import { ILoginResponse } from 'src/domain/entities/login-response.entity';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery, ILoginResponse> {
  @Inject('IUserRepository') private readonly userRepository: IUserRepository;

  async execute(command: LoginQuery): Promise<ILoginResponse> {
    return await this.userRepository.login({
      username: command.username,
      password: command.password,
    });
  }
}
