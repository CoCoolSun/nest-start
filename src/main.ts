import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import { HttpExceptionFilter } from "./common/filter/http-exception.filter";
// HTTP头安全
import * as helmet from 'helmet';
// 限速及频率
import * as rateLimit from 'express-rate-limit';
import rateLimitConfig from './config/express-rate-limit-config'
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.set('trust proxy', 1);
  app.enableCors();
  app.use(helmet());
  app.use('/', rateLimit(rateLimitConfig))
  // 全局http异常过滤
  app.useGlobalFilters(new HttpExceptionFilter())
  const swaggerConfig = new DocumentBuilder()
    .setTitle('api文档')
    .setDescription('api接口说明文档')
    .setVersion('1.0')
    .addTag('nest')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('doc', app, document)
  await app.listen(8010);
}
bootstrap();
