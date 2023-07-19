import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://dev-alldb:devroot@172.20.6.22:27017/ranjith?authMechanism=DEFAULT&authSource=admin'),
    OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
