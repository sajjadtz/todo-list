import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ITodoListItem } from 'src/domain/entities/todo-list-item.entity';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { IUser } from 'src/domain/entities/user.entity';

@Schema()
export class TodoListItem extends Document implements ITodoListItem {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  description: string;

  @Prop({ required: true })
  priority: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'TodoList',
  })
  todoList: ITodoList;
}

export const TodoListItemSchema = SchemaFactory.createForClass(TodoListItem);
TodoListItemSchema.index(
  { title: 1, 'user.id': 1, isDeleted: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);
