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
import { CreateTodoListCommand } from 'src/application/command/interface/create-todo-list.command';
import { UpdateTodoListCommand } from 'src/application/command/interface/update-todo-list.command';
import { TodoListDto } from '../dto/todo-list/todo-list.dto';
import { FindTodoListByIdQuery } from 'src/application/query/interface/find-todo-list-by-id.query';
import { ApiParam, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
@Controller('todo-list')
@ApiBearerAuth()
export class TodoListController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: TodoListDto })
  async getTodoList(
    @Param('id') id: string,
    @CurrentUser() user: IUser,
  ): Promise<TodoListDto> {
    return await this.queryBus.execute(new FindTodoListByIdQuery(id, user));
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createTodoList(
    @Body() todoList: CreateTodoListDto,
    @CurrentUser() user: IUser,
  ): Promise<void> {
    return await this.commandBus.execute(
      new CreateTodoListCommand({
        title: todoList.title,
        user: { id: user.id },
      }),
    );
  }

  @Patch('/:id')
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TodoListDto })
  async updateTodoList(
    @Param('id') id: string,
    @Body() todoList: CreateTodoListDto,
    @CurrentUser() user: IUser,
  ): Promise<void> {
    return await this.commandBus.execute(
      new UpdateTodoListCommand(id, user, todoList.title),
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
