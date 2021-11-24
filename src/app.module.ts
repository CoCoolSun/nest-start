import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { resolve } from 'path';
//数据库模块
import { TypeOrmModule } from "@nestjs/typeorm";
// 配置管理模块
import { ConfigModule, ConfigService } from "nestjs-config";


// 自定义模块
import {AppController} from './app.controller';
import { ApiModule } from './modules/api/api.module';
import { AuthModule } from './modules/auth/auth.module';
import {LoggerMiddleware} from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ConfigService.get('dataBaseConfig'),
      inject: [ConfigService]
    }),
    ApiModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  // 中间件应用
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes('*');
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      })
  }
}