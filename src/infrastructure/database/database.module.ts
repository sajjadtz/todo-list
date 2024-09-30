import { Module } from '@nestjs/common';
import { MongodbModule } from './mongo/mongodb.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { TodoListRepositoryImpl } from '../repositories/todo-list.repository.impl';
import { TodoList, TodoListSchema } from './schema/todo-list.schema';
import { TodoListItem, TodoListItemSchema } from './schema/todo-list-item.schema';
import { TodoListItemRepositoryImpl } from '../repositories/todo-list-item.repository.impl';

@Module({
  imports: [
    MongodbModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: TodoList.name, schema: TodoListSchema },
      { name: TodoListItem.name, schema: TodoListItemSchema },
    ]),
  ],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepositoryImpl },
    { provide: 'ITodoListRepository', useClass: TodoListRepositoryImpl },
    { provide: 'ITodoListItemRepository', useClass: TodoListItemRepositoryImpl },
  ],
  exports: [
    { provide: 'IUserRepository', useClass: UserRepositoryImpl },
    { provide: 'ITodoListRepository', useClass: TodoListRepositoryImpl },
    { provide: 'ITodoListItemRepository', useClass: TodoListItemRepositoryImpl },
  ],
})
export class DatabaseModule {}
