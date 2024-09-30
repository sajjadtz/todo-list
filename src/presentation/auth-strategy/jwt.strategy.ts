import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { AppConfig } from 'src/shared/configs/interfaces/app-config.interface';
import { AppConfigs } from 'src/shared/configs/app-configs';
import { IUser } from 'src/domain/entities/user.entity';
import { FindUserByUsernameQuery } from 'src/application/query/interface/find-user-by-username.query';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly queryBus: QueryBus,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<AppConfig>(AppConfigs.APP).secret,
    });
  }

  async validate(payload: IUser): Promise<IUser> {
    try {
      return await this.queryBus.execute(
        new FindUserByUsernameQuery(payload.username),
      );
    } catch {
      throw new UnauthorizedException();
    }
  }
}
