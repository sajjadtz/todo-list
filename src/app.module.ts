import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoadConfigs } from './shared/configs/loader/loader';
import { CqrsModule } from '@nestjs/cqrs';
import { SignUpUserHandler } from './application/command/handler/sign-up-user.handler';
import { FindUserByUsernameHandler } from './application/query/handler/find-user-by-username.handler';
import { LoginHandler } from './application/query/handler/login-user.handler';
import { JwtStrategy } from './presentation/auth-strategy/jwt.strategy';
import { CreateTodoListHandler } from './application/command/handler/create-todo-list.handler';
import { DeleteTodoListHandler } from './application/command/handler/delete-todo-list.handler';
import { UpdateTodoListHandler } from './application/command/handler/update-todo-list.handler';
import { TodoListController } from './presentation/controllers/todo-list.controller';
import { CreateTodoListItemHandler } from './application/command/handler/create-todo-list-item.handler';
import { DeleteTodoListItemHandler } from './application/command/handler/delete-todo-list-item.handler';
import { UpdateTodoListItemHandler } from './application/command/handler/update-todo-list-item.handler';
import { TodoListItemController } from './presentation/controllers/todo-list-item.controller';
import { MoveTodoListItemHandler } from './application/command/handler/move-todo-list-item.handler';
import { FindTodoListByIdHandler } from './application/query/handler/find-todo-list-by-id.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [LoadConfigs],
    }),
    DatabaseModule,
    CqrsModule,
  ],
  controllers: [UserController, TodoListController, TodoListItemController],
  providers: [
    SignUpUserHandler,
    FindUserByUsernameHandler,
    LoginHandler,
    JwtStrategy,
    CreateTodoListHandler,
    UpdateTodoListHandler,
    DeleteTodoListHandler,
    CreateTodoListItemHandler,
    UpdateTodoListItemHandler,
    DeleteTodoListItemHandler,
    MoveTodoListItemHandler,
    FindTodoListByIdHandler,
  ],
})
export class AppModule {}
