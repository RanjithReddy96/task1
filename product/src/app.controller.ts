import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ProductsService } from './products/products.service';

@Controller()
export class AppController {
  constructor(private readonly productsService: ProductsService,private readonly amqpConnection: AmqpConnection) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get()
  async findAll() {
    try {
      let exchange = 'user';
      let routingKey = 'initial';
      let payload =await this.productsService.findAll()
      await this.amqpConnection.publish(exchange, routingKey, payload)
      return { message: "added to queue" }

    } catch (error) {
      throw error
    }
  }
}
