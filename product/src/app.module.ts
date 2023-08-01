import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductsModule } from './products/products.module';
import { RabbitMQModule } from './rabbit-mq.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://dev-alldb:devroot@172.20.6.22:27017/ranjith?authMechanism=DEFAULT&authSource=admin'),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),ProductsModule,RabbitMQModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
