import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { resolve } from 'path';
//数据库模块
import { TypeOrmModule } from "@nestjs/typeorm";
// 配置管理模块
import { ConfigModule, ConfigService } from "nestjs-config";
// 邮箱模块
import { MailerModule } from "@nestjs-modules/mailer";

// 自定义模块
import {AppController} from './app.controller';
import { ApiModule } from './modules/api/api.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ConfigService.get('dataBaseConfig'),
      inject: [ConfigService]
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ConfigService.get('email'),
      inject: [ConfigService]
    }),
    ApiModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
