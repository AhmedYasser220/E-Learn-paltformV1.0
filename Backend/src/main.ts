import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  
    app.enableCors({
      origin: 'http://localhost:3000', // Allow requests from Next.js server
      methods: 'GET,POST,PUT,PATCH,DELETE',
      credentials: true,
    });
    app.use(cookieParser());
 //   await app.listen(process.env.PORT);

  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('api-docs',app,document);

  await app.listen(4000);

}
bootstrap();
