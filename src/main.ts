import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from Next.js server
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(3333);
}
bootstrap();
