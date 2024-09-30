import { ICommand } from '@nestjs/cqrs';

export class SignUpUserCommand implements ICommand {
  constructor(
    readonly username: string,
    readonly password: string,
  ) {}
}
