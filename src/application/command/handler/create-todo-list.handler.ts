import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../interface/create-todo-list.command';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand, ITodoList>
{
  @Inject('ITodoListRepository')
  private readonly todoListRepository: ITodoListRepository;

  @Inject('IUserRepository') private readonly userRepository: IUserRepository;

  async execute({
    todoList,
  }: {
    todoList: Omit<ITodoList, 'items'>;
  }): Promise<ITodoList> {
    const result = await this.todoListRepository.create({ todoList });
    await this.userRepository.addTodoList({
      id: todoList.user.id,
      listId: result.id,
    });
    return result;
  }
}
