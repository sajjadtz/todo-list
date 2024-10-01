import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ITodoList } from 'src/domain/entities/todo-list.entity';
import { IUser } from 'src/domain/entities/user.entity';

@Schema()
export class User extends Document implements IUser {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [Types.ObjectId], default: [], ref: 'TodoList' })
  lists: ITodoList[];
}

export const UserSchema = SchemaFactory.createForClass(User);
