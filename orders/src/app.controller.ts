import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @RabbitSubscribe({
    exchange: 'user',
    routingKey: 'initial',
    
  })
  public async pubSubHandler(msg: {}) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }

 
}
