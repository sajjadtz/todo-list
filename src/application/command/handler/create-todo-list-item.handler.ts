import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListItemCommand } from '../interface/create-todo-list-item.command';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { ITodoListItemRepository } from 'src/domain/repositories/todo-list-item.repository';
import { ITodoListItem } from 'src/domain/entities/todo-list-item.entity';
import { IUser } from 'src/domain/entities/user.entity';
import { LexoRank } from 'lexorank';

@CommandHandler(CreateTodoListItemCommand)
export class CreateTodoListItemHandler
  implements ICommandHandler<CreateTodoListItemCommand, void>
{
  @Inject('ITodoListItemRepository')
  private readonly todoListItemRepository: ITodoListItemRepository;

  @Inject('ITodoListRepository')
  private readonly todoListRepository: ITodoListRepository;

  async execute({
    todoListItem,
    todoListId,
    user,
  }: {
    todoListItem: Omit<ITodoListItem, 'todoList' | 'priority'>;
    todoListId: string;
    user: IUser;
  }): Promise<void> {
    const list = await this.todoListRepository.findById(todoListId);
    const items = list.items ?? [];

    const lastCard = items.sort((a, b) => (a.priority > b.priority ? 1 : -1))[
      items.length - 1
    ];

    const priority = lastCard
      ? LexoRank.parse(lastCard.priority).genNext().format()
      : LexoRank.min().genNext().format();

    if (list.user.id === user.id) {
      const result = await this.todoListItemRepository.create({
        todoListItem: {
          ...todoListItem,
          todoList: { id: todoListId },
          priority,
        },
      });
      await this.todoListRepository.addTodoListItem({
        id: todoListId,
        itemId: result.id,
      });
      return;
    }

    throw 'forbidden resource';
  }
}
