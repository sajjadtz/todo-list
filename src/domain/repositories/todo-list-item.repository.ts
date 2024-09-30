import { ITodoListItem } from '../entities/todo-list-item.entity';

export interface ITodoListItemRepository {
  findById(id: string | number): Promise<ITodoListItem>;
  create(data: { todoListItem: ITodoListItem }): Promise<ITodoListItem>;
  update(data: {
    id: string | number;
    title?: string;
    description?: string;
    priority?: string;
  }): Promise<void>;
  delete(data: { id: string | number }): Promise<ITodoListItem>;
}
