import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";

// HTTP头安全
import * as helmet from 'helmet';
// 限速及频率
import * as rateLimit from 'express-rate-limit';
import rateLimitConfig from './config/express-rate-limit-config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.set('trust proxy', 1);
  app.enableCors();
  app.use(helmet());
  app.use('/', rateLimit(rateLimitConfig))
  await app.listen(8010);
}
bootstrap();
