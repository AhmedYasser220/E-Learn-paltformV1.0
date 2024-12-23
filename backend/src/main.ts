import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL if different
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all common HTTP methods
    credentials: true, // Important if you're using cookies or sessions
  });

  await app.listen(3333); // Your backend port
}
bootstrap();