import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [MongooseModule.forRoot('mongodb://dev-alldb:devroot@172.20.6.22:27017/ranjith?authMechanism=DEFAULT&authSource=admin'),
  RabbitMQModule.forRootAsync(RabbitMQModule, {
    useFactory: () => ({
      exchanges: [
        {
          name: 'user',
          type: 'topic',
        },
      ],
      uri : 'amqp://admin:admin@172.20.6.22:5672/',
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: true, reject: true, timeout: 3000 },
    }),
  }),
    OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
