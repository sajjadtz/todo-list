import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { IUser } from 'src/domain/entities/user.entity';
import { ITodoListItemRepository } from 'src/domain/repositories/todo-list-item.repository';
import { ITodoListItem } from 'src/domain/entities/todo-list-item.entity';
import { TodoListItem } from '../database/schema/todo-list-item.schema';

@Injectable()
export class TodoListItemRepositoryImpl implements ITodoListItemRepository {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(TodoListItem.name)
    private todoListItemModel: Model<TodoListItem>,
  ) {}

  async create({
    todoListItem,
    user,
  }: {
    todoListItem: Omit<ITodoListItem, 'priority'>;
    user: IUser;
  }): Promise<void> {
    (await this.todoListItemModel.create(todoListItem)).toJSON();
    return;
  }

  async update({
    id,
    title,
    description,
    user,
  }: {
    id: string | number;
    user: IUser;
    title: string;
    description: string;
  }): Promise<void> {
    await this.todoListItemModel.findOneAndUpdate(
      {
        _id: id,
        'user.id': user.id,
      },
      {
        title,
        description,
      },
    );

    return;
  }

  async delete({
    id,
    user,
  }: {
    id: string | number;
    user: IUser;
  }): Promise<void> {
    await this.todoListItemModel.findOneAndDelete({
      _id: id,
      'user.id': user.id,
    });

    return;
  }

  async move({
    id,
    user,
    next,
  }: {
    id: string | number;
    user: IUser;
    next: ITodoListItem;
  }): Promise<void> {
    // await this.todoListItemModel.findOneAndDel0ete({
    //   _id: id,
    //   'user.id': user.id,
    // });

    return;
  }
}
