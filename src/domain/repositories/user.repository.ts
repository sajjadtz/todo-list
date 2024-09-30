import { ILoginResponse } from '../entities/login-response.entity';
import { IUser } from '../entities/user.entity';

export interface IUserRepository {
  signUp(data: { user: Omit<IUser, 'lists'> }): Promise<void>;
  login(data: Omit<IUser, 'lists'>): Promise<ILoginResponse>;
  getUserByUsername(data: Pick<IUser, 'username'>): Promise<IUser>;
}
