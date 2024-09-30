import { ICommand } from '@nestjs/cqrs';

export class UpdateTodoListItemCommand implements ICommand {
  constructor(
    readonly id: string | number,
    readonly title: string,
    readonly description: string,
  ) {}
}
