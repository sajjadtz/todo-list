import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { FindTodoListByIdQuery } from '../interface/find-todo-list-by-id.query';
import { IUser } from 'src/domain/entities/user.entity';

@QueryHandler(FindTodoListByIdQuery)
export class FindTodoListByIdHandler
  implements IQueryHandler<FindTodoListByIdQuery, ITodoList>
{
  @Inject('ITodoListRepository')
  private readonly todoListRepository: ITodoListRepository;

  async execute({ id, user }: { id: string; user: IUser }): Promise<ITodoList> {
    const result = await this.todoListRepository.findById(id);

    if (result.user.id !== user.id) throw 'forbidden resource';

    result.items = (result.items ?? []).sort((a, b) =>
      a.priority > b.priority ? 1 : -1,
    );

    return result;
  }
}
