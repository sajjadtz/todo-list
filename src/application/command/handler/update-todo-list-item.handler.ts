import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListItemCommand } from '../interface/update-todo-list-item.command';
import { ITodoListItemRepository } from 'src/domain/repositories/todo-list-item.repository';

@CommandHandler(UpdateTodoListItemCommand)
export class UpdateTodoListItemHandler
  implements ICommandHandler<UpdateTodoListItemCommand, void>
{
  @Inject('ITodoListItemRepository')
  private readonly todoListItemRepository: ITodoListItemRepository;

  async execute({
    id,
    description,
    title,
  }: {
    id: string | number;
    title: string;
    description: string;
  }): Promise<void> {
    await this.todoListItemRepository.update({
      id,
      description,
      title,
    });
    return;
  }
}
