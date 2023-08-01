import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { RabbitMQService } from 'src/rabbit-mq.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private readonly rabbitMQService: RabbitMQService,) {}

  @Get()
  async findAll() {
      this.rabbitMQService.send('rabbit-mq-producer', {
        message: await this.productsService.findAll()
      })
    
    return 'Message sent to the queue!';
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id) ;
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createProductDto: CreateProductDto) {
    return this.productsService.update(id, createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
