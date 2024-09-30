import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ITodoListItem } from 'src/domain/entities/todo-list-item.entity';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { IUser } from 'src/domain/entities/user.entity';

@Schema()
export class TodoList extends Document implements ITodoList {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  })
  user: IUser;

  @Prop({ type: [Types.ObjectId], default: [], ref: 'TodoListItem' })
  items: ITodoListItem[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
TodoListSchema.index(
  { title: 1, 'user.id': 1, isDeleted: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);
