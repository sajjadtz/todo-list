import {
  Controller,
  Post,
  UseGuards,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IUser } from 'src/domain/entities/user.entity';
import { CurrentUser } from 'src/shared/decorator/current-user.decorator';
import { CreateTodoItemDto } from '../dto/todo-list-item/create-todo-list-item.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { CreateTodoListItemCommand } from 'src/application/command/interface/create-todo-list-item.command';
import { UpdateTodoListItemCommand } from 'src/application/command/interface/update-todo-list-item.command';
import { UpdateTodoItemDto } from '../dto/todo-list-item/update-todo-list-item.dto';
import { DeleteTodoListItemCommand } from 'src/application/command/interface/delete-todo-list-item.command';
import { MoveTodoItemDto } from '../dto/todo-list-item/move-todo-list-item.dto';
import { MoveTodoListItemCommand } from 'src/application/command/interface/move-todo-list-item.command';

@Controller('todo-list-item')
export class TodoListItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createTodoListItem(
    @Body() todoListItem: CreateTodoItemDto,
    @CurrentUser() user: IUser,
  ): Promise<void> {
    return await this.commandBus.execute(
      new CreateTodoListItemCommand(
        {
          title: todoListItem.title,
          description: todoListItem.description,
        },
        todoListItem.todoListId,
        user,
      ),
    );
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateTodoListItem(
    @Param('id') id: string,
    @Body() todoListItem: UpdateTodoItemDto,
  ): Promise<void> {
    return await this.commandBus.execute(
      new UpdateTodoListItemCommand(
        id,
        todoListItem.title,
        todoListItem.description,
      ),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTodoListItem(@Param('id') id: string): Promise<void> {
    return await this.commandBus.execute(new DeleteTodoListItemCommand(id));
  }

  @Post('/:id/move')
  @UseGuards(JwtAuthGuard)
  async moveTodoListItem(
    @Param('id') id: string,
    @Body() moveItem: MoveTodoItemDto,
  ): Promise<void> {
    return await this.commandBus.execute(
      new MoveTodoListItemCommand(id, moveItem.prevPriority),
    );
  }
}
