// src/cats.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsModule } from './products.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schemas/product.schema';
describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri, {
        }),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
      ],
      providers: [ProductsService],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  it('should Create "Product', async () => {
    const mockProduct = {
        _id: '61c0ccf11d7bf83d153d7c06',
        name: 'car',
        price: 20,
        description: 'car Description',
      };
      const result = await productsService.create(mockProduct);
    console.log(result)
  });

  it('should return All product data', async () => {
    const result = await productsService.findAll();
    console.log(result)
  });
  it('should return  product data', async () => {
    const id = '61c0ccf11d7bf83d153d7c06'
    const result = await productsService.findOne(id);
    console.log(result)
  });
  it('should Update  product data', async () => {
    const id = '61c0ccf11d7bf83d153d7c06'
    const mockProduct = {
      name: 'jeep',
      price: 200,
      description: 'car-Description',
    };
    const result = await productsService.update(id,mockProduct);
    console.log(result)
  });
  it('should Delete   product data', async () => {
    const id = '61c0ccf11d7bf83d153d7c06'
    const result = await productsService.remove(id);
    console.log(result)
  });
  it('should return All product data', async () => {
    const result = await productsService.findAll();
    console.log(result)
  });
  // it('should return  product data', async () => {
  //   const id = '61c0ccf11d7bf83d153d7c07'
  //   const result = await productsService.findOne(id);
  //   console.log(result)
  // });
});
