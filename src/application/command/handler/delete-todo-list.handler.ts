import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListCommand } from '../interface/delete-todo-list.command';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { IUser } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler
  implements ICommandHandler<DeleteTodoListCommand, void>
{
  @Inject('ITodoListRepository')
  private readonly todoListRepository: ITodoListRepository;

  @Inject('IUserRepository') private readonly userRepository: IUserRepository;

  async execute({
    id,
    user,
  }: {
    id: string | number;
    user: IUser;
  }): Promise<void> {
    const result = await this.todoListRepository.delete({ id, user });

    await this.userRepository.removeTodoList({
      id: user.id,
      listId: id,
    });
    return;
  }
}
