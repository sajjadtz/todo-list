import { Module } from '@nestjs/common';
import { MongodbModule } from './mongo/mongodb.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { TodoListRepositoryImpl } from '../repositories/todo-list.repository.impl';
import { TodoList, TodoListSchema } from './schema/todo-list.schema';

@Module({
  imports: [
    MongodbModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: TodoList.name, schema: TodoListSchema },
    ]),
  ],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepositoryImpl },
    { provide: 'ITodoListRepository', useClass: TodoListRepositoryImpl },
  ],
  exports: [
    { provide: 'IUserRepository', useClass: UserRepositoryImpl },
    { provide: 'ITodoListRepository', useClass: TodoListRepositoryImpl },
  ],
})
export class DatabaseModule {}
