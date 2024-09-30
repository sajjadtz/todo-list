import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByUsernameQuery } from '../interface/find-user-by-username.query';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IUser } from 'src/domain/entities/user.entity';

@QueryHandler(FindUserByUsernameQuery)
export class FindUserByUsernameHandler
  implements IQueryHandler<FindUserByUsernameQuery, IUser>
{
  @Inject('IUserRepository') private readonly userRepository: IUserRepository;

  async execute(command: FindUserByUsernameQuery): Promise<IUser> {
    return await this.userRepository.getUserByUsername({
      username: command.username,
    });
  }
}
