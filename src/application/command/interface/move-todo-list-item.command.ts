import { ICommand } from '@nestjs/cqrs';

export class MoveTodoListItemCommand implements ICommand {
  constructor(
    readonly id: string | number,
    readonly prevPriority?: string,
  ) {}
}
