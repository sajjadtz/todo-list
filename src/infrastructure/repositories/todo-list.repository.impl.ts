import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { TodoList } from '../database/schema/todo-list.schema';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { IUser } from 'src/domain/entities/user.entity';

@Injectable()
export class TodoListRepositoryImpl implements ITodoListRepository {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(TodoList.name) private todoListModel: Model<TodoList>,
  ) {}

  async create({
    todoList,
  }: {
    todoList: Omit<ITodoList, 'items'>;
  }): Promise<ITodoList> {
    return (await this.todoListModel.create(todoList)).toJSON();
  }

  async update({
    id,
    title,
    user,
  }: {
    id: string | number;
    user: IUser;
    title: string;
  }): Promise<ITodoList> {
    const result = await this.todoListModel.findOneAndUpdate(
      {
        _id: id,
        'user.id': user.id,
      },
      {
        title,
      },
      { new: true },
    );

    return result.toJSON();
  }

  async delete({
    id,
    user,
  }: {
    id: string | number;
    user: IUser;
  }): Promise<void> {
    await this.todoListModel.findOneAndDelete({
      _id: id,
      'user.id': user.id,
    });

    return;
  }
}
