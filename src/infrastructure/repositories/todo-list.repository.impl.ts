import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodoListRepository } from 'src/domain/repositories/todo-list.repository';
import { TodoList } from '../database/schema/todo-list.schema';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { IUser } from 'src/domain/entities/user.entity';
import { NotFoundException } from 'src/shared/exceptions/not-found.exception';

@Injectable()
export class TodoListRepositoryImpl implements ITodoListRepository {
  constructor(
    @InjectModel(TodoList.name) private todoListModel: Model<TodoList>,
  ) {}

  async findById(id: string | number): Promise<ITodoList> {
    const result = await this.todoListModel.findOne(
      {
        _id: id,
      },
      {},
      {
        populate: [
          {
            path: 'items',
          },
        ],
      },
    );

    if (!result) throw new NotFoundException();

    return result.toJSON();
  }

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

    if (!result) throw new NotFoundException();

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

  async addTodoListItem({
    id,
    itemId,
  }: {
    id: string | number;
    itemId: string | number;
  }): Promise<void> {
    await this.todoListModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: { items: itemId },
      },
    );
    return;
  }

  async removeTodoListItem({
    id,
    itemId,
  }: {
    id: string | number;
    itemId: string | number;
  }): Promise<void> {
    await this.todoListModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $pull: { items: itemId },
      },
    );
    return;
  }
}
