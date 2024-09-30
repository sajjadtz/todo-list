import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MoveTodoListItemCommand } from '../interface/move-todo-list-item.command';
import { ITodoListItemRepository } from 'src/domain/repositories/todo-list-item.repository';
import { ITodoListItem } from 'src/domain/entities/todo-list-item.entity';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { LexoRank } from 'lexorank';

@CommandHandler(MoveTodoListItemCommand)
export class MoveTodoListItemHandler
  implements ICommandHandler<MoveTodoListItemCommand, void>
{
  @Inject('ITodoListItemRepository')
  private readonly todoListItemRepository: ITodoListItemRepository;

  @Inject('ITodoListRepository')
  private readonly todoListRepository: ITodoListRepository;

  async execute({
    id,
    prevPriority,
  }: {
    id: string | number;
    prevPriority?: string;
  }): Promise<void> {
    const item = await this.todoListItemRepository.findById(id);

    const list = await this.todoListRepository.findById(item.todoList.id);
    const items = (list.items ?? []).sort((a, b) =>
      a.priority > b.priority ? 1 : -1,
    );

    let newPriority = '';

    if (prevPriority) {
      const prevPos = LexoRank.parse(prevPriority);
      const index = items.findIndex((item) => item.priority === prevPriority);
      if (items[index + 1])
        newPriority = prevPos
          .between(LexoRank.parse(items[index + 1].priority))
          .format();
      else newPriority = prevPos.genNext().format();
    } else {
      if (items[0]) {
        const nextPos = LexoRank.parse(items[0].priority);
        newPriority = LexoRank.min().between(nextPos).format();
      } else newPriority = LexoRank.min().genNext().format();
    }

    await this.todoListItemRepository.update({
      id,
      priority: newPriority,
    });
    return;
  }
}
