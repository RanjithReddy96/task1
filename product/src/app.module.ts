import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://dev-alldb:devroot@172.20.6.22:27017/ranjith?authMechanism=DEFAULT&authSource=admin'),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
