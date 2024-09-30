import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILoginResponse } from 'src/domain/entities/login-response.entity';
import { IUser } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { User } from '../database/schema/user.schema';
import { hash, genSalt, compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AppConfigs } from 'src/shared/configs/app-configs';
import { AppConfig } from 'src/shared/configs/interfaces/app-config.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getUserByUsername({ username }: { username: string }): Promise<IUser> {
    return (await this.userModel.findOne({ username })).toJSON();
  }

  async signUp({
    user,
  }: {
    user: Omit<IUser, 'lists'>;
  }): Promise<ILoginResponse> {
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    await this.userModel.create(user);

    return await this.login(user);
  }

  async login({
    password,
    username,
  }: {
    username: string;
    password: string;
  }): Promise<ILoginResponse> {
    const user = await this.getUserByUsername({ username });
    if (!user || !(await compare(password, user.password))) {
      throw 'unauthorized';
    }

    const { secret, tokenExpireTime } = this.configService.get<AppConfig>(
      AppConfigs.APP,
    );

    return {
      accessToken: jwt.sign(user, secret, {
        expiresIn: tokenExpireTime,
      }),
      user,
    };
  }
}
