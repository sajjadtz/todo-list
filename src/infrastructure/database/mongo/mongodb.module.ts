import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { TimestampPlugin } from './plugins/mongo-timestamp.Plugin';
import { MongoConfig } from 'src/shared/configs/interfaces/mongo-config.interface';
import { AppConfigs } from 'src/shared/configs/app-configs';
import { url } from 'inspector';
import { IdPlugin } from './plugins/mongo-id.Plugin';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<MongoConfig>(AppConfigs.MONGO);
        return {
          uri: config.url,
          autoIndex: true,
          connectionFactory: (connection) => {
            connection.plugin(IdPlugin);
            connection.plugin(TimestampPlugin);
            return connection;
          },
        };
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class MongodbModule {}
