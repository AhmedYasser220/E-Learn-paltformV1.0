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


//  app.enableCors({
//   origin: 'http://localhost:3000', // Specify the frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
//   credentials: true, // Allow credentials (cookies, authorization headers)
// });

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend
}));


  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('api-docs',app,document);

  await app.listen(4000);

}
bootstrap();
