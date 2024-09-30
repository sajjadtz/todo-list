import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpUserCommand } from '../interface/sign-up-user.command';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@CommandHandler(SignUpUserCommand)
export class SignUpUserHandler
  implements ICommandHandler<SignUpUserCommand, void>
{
  @Inject('IUserRepository') private readonly userRepository: IUserRepository;

  async execute({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> {
    await this.userRepository.signUp({ user: { username, password } });
    return;
  }
}
