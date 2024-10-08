import { ICommand } from '@nestjs/cqrs';
import { IUser } from 'src/domain/entities/user.entity';

export class DeleteTodoListItemCommand implements ICommand {
  constructor(readonly id: string | number) {}
}
