import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { IUser } from 'src/domain/entities/user.entity';
import { CurrentUser } from 'src/shared/decorator/current-user.decorator';
import { CreateTodoListDto } from '../dto/todo-list/create-todo-list.dto';
import { DeleteTodoListCommand } from 'src/application/command/interface/delete-todo-list.command';
import { CreateTodoListQuery } from 'src/application/query/interface/create-todo-list.query';
import { UpdateTodoListQuery } from 'src/application/query/interface/update-todo-list.query';
import { TodoListDto } from '../dto/todo-list/todo-list.dto';
import { FindTodoListByIdQuery } from 'src/application/query/interface/find-todo-list-by-id.query';

@Controller('todo-list')
export class TodoListController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getTodoList(
    @Param('id') id: string,
    @CurrentUser() user: IUser,
  ): Promise<TodoListDto> {
    return await this.queryBus.execute(
      new FindTodoListByIdQuery(id, user),
    );
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createTodoList(
    @Body() todoList: CreateTodoListDto,
    @CurrentUser() user: IUser,
  ): Promise<void> {
    return await this.queryBus.execute(
      new CreateTodoListQuery({
        title: todoList.title,
        user: { id: user.id },
      }),
    );
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateTodoList(
    @Param('id') id: string,
    @Body() todoList: CreateTodoListDto,
    @CurrentUser() user: IUser,
  ): Promise<void> {
    return await this.queryBus.execute(
      new UpdateTodoListQuery(id, user, todoList.title),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTodoList(
    @Param('id') id: string,
    @CurrentUser() user: IUser,
  ): Promise<void> {
    return await this.commandBus.execute(new DeleteTodoListCommand(id, user));
  }
}
