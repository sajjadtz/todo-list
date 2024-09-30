import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListItemCommand } from '../interface/delete-todo-list-item.command';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { ITodoListItemRepository } from 'src/domain/repositories/todo-list-item.repository';

@CommandHandler(DeleteTodoListItemCommand)
export class DeleteTodoListItemHandler
  implements ICommandHandler<DeleteTodoListItemCommand, void>
{
  @Inject('ITodoListItemRepository')
  private readonly todoListItemRepository: ITodoListItemRepository;

  @Inject('ITodoListRepository')
  private readonly todoListRepository: ITodoListRepository;

  async execute({ id }: { id: string | number }): Promise<void> {
    const result = await this.todoListItemRepository.delete({
      id,
    });

    await this.todoListRepository.removeTodoListItem({
      id: result.todoList.id,
      itemId: id,
    });
    return;
  }
}
