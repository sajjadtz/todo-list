import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { IUser } from 'src/domain/entities/user.entity';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { UpdateTodoListQuery } from '../interface/update-todo-list.query';

@QueryHandler(UpdateTodoListQuery)
export class UpdateTodoListHandler
  implements IQueryHandler<UpdateTodoListQuery, ITodoList>
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
