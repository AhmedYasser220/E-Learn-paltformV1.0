import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true, // If using cookies
  });
  await app.listen(3333);
}
bootstrap();
  