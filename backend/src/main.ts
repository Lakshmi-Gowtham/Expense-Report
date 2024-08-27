import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'; // Import cors middleware
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Disable etag and remove unwanted headers
  (app as any).set('etag', false);
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });

  // Enable CORS for requests from your React frontend
  app.use(cors({
    origin: 'http://localhost:3000', // React frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers)
  }));

  // Use global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000); // Ensure the backend listens on a different port
}

bootstrap();
