import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice( {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@172.20.6.22:5672/'],
      queue: 'rabbit-mq-nest-js',
      noAck: false,
      prefetchCount: 1
    }
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe())
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
