import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from '../schemas/product.schema';
import { RabbitMQModule } from 'src/rabbit-mq.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),RabbitMQModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
