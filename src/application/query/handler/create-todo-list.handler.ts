import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CreateTodoListQuery } from '../interface/create-todo-list.query';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@QueryHandler(CreateTodoListQuery)
export class CreateTodoListHandler
  implements IQueryHandler<CreateTodoListQuery, ITodoList>
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
