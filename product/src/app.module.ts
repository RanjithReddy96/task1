import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductsModule } from './products/products.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ProductsService } from './products/products.service';

const uri = 'amqp://admin:admin@172.20.6.22:5672/'
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://dev-alldb:devroot@172.20.6.22:27017/ranjith?authMechanism=DEFAULT&authSource=admin'),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: () => ({
        exchanges: [
          {
            name: 'user',
            type: 'topic',
          },
        ],
        uri,
        connectionInitOptions: { wait: true, reject: true, timeout: 3000 },
      }),
    }), ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService, ProductsService],
})
export class AppModule { }
