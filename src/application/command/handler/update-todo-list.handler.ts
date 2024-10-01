import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { IUser } from 'src/domain/entities/user.entity';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { UpdateTodoListCommand } from '../interface/update-todo-list.command';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler
  implements ICommandHandler<UpdateTodoListCommand, ITodoList>
{
  @Inject('ITodoListRepository')
  private readonly todoListRepository: ITodoListRepository;

  async execute({
    id,
    user,
    title,
  }: {
    id: string | number;
    title: string;
    user: IUser;
  }): Promise<ITodoList> {    
    return await this.todoListRepository.update({ id, title, user });
  }
}
