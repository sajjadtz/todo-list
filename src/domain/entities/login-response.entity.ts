import { IUser } from './user.entity';

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
}
