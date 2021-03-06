import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { resolve } from 'path';
//数据库模块
import { TypeOrmModule } from "@nestjs/typeorm";
// 配置管理模块
import { ConfigModule, ConfigService } from "nestjs-config";
// 邮箱模块
import { MailerModule } from "@nestjs-modules/mailer";
// 服务监控模块
import { StatusMonitorModule } from "nest-status-monitor";
import statusMonitorConfig from './config/statusMonitor';
// 定时调度模块
// import { ScheduleModule } from '@nestjs/schedule';
// 自定义模块
import {AppController} from './app.controller';
import { ApiModule } from './modules/api/api.module';
import { AuthModule } from './modules/auth/auth.module';
import {LoggerMiddleware} from './common/middleware/logger.middleware';
import { TaskModule } from './module/task/task.module';
import { UploadDownloadModule } from './modules/upload-download/upload-download.module';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    StatusMonitorModule.setUp(statusMonitorConfig),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ConfigService.get('dataBaseConfig'),
      inject: [ConfigService]
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ConfigService.get('email'),
      inject: [ConfigService]
    }),
    // ScheduleModule.forRoot(), //定时任务配置
    ApiModule,
    AuthModule,
    TaskModule,
    UploadDownloadModule,
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