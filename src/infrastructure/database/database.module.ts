import { Module } from '@nestjs/common';
import { MongodbModule } from './mongo/mongodb.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';

@Module({
  imports: [
    MongodbModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [{ provide: 'IUserRepository', useClass: UserRepositoryImpl }],
  exports: [{ provide: 'IUserRepository', useClass: UserRepositoryImpl }],
})
export class DatabaseModule {}
