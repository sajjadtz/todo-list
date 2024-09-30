import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodoListItemRepository } from 'src/domain/repositories/todo-list-item.repository';
import { ITodoListItem } from 'src/domain/entities/todo-list-item.entity';
import { TodoListItem } from '../database/schema/todo-list-item.schema';

@Injectable()
export class TodoListItemRepositoryImpl implements ITodoListItemRepository {
  constructor(
    @InjectModel(TodoListItem.name)
    private todoListItemModel: Model<TodoListItem>,
  ) {}

  async findById(id: string | number): Promise<ITodoListItem> {
    return (
      await this.todoListItemModel.findOne({
        _id: id,
      })
    ).toJSON();
  }

  async create({
    todoListItem,
  }: {
    todoListItem: ITodoListItem;
  }): Promise<ITodoListItem> {
    return (await this.todoListItemModel.create(todoListItem)).toJSON();
  }

  async update({
    id,
    title,
    description,
    priority,
  }: {
    id: string | number;
    title?: string;
    description?: string;
    priority?: string;
  }): Promise<void> {
    await this.todoListItemModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        title,
        description,
        priority,
      },
    );

    return;
  }

  async delete({ id }: { id: string | number }): Promise<ITodoListItem> {
    return (
      await this.todoListItemModel.findOneAndDelete({
        _id: id,
      })
    ).toJSON();
  }
}
