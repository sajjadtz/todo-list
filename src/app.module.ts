import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoadConfigs } from './shared/configs/loader/loader';
import { CqrsModule } from '@nestjs/cqrs';
import { SignUpUserHandler } from './application/command/handler/sign-up-user.handler';
import { FindUserByUsernameHandler } from './application/query/handler/find-user-by-username.handler';
import { LoginHandler } from './application/query/handler/login-user.handler';
import { JwtStrategy } from './presentation/auth-strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [LoadConfigs],
    }),
    DatabaseModule,
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    SignUpUserHandler,
    FindUserByUsernameHandler,
    LoginHandler,
    JwtStrategy,
  ],
})
export class AppModule {}
