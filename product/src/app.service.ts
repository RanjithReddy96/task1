import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  getHello(): string {
    return 'Hello World!';
  }

  async request():Promise<any>{
    const response = await this.amqpConnection.request({
      exchange: 'user',
      routingKey: 'initial',
      timeout:1000
    });

    return response as any;
  }
  }

