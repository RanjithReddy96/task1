import { ProductsService } from "./products.service";
import { Model } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Product } from "../schemas/product.schema";
import { HttpException, HttpStatus } from "@nestjs/common";


describe('ProductsService', () => {
  let productsService: ProductsService;
  let model: Model<Product>;

  const mockProduct: any = {
    _id: '61c0ccf11d7bf83d153d7c06',
    name: 'car',
    price: 20,
    description: 'car Description',
  };

  const mockSingleProduct = {
    _id: '61c0ccf11d7bf83d153d7c06',
    name: 'Updated name',
    price: 20,
    description: 'car Description',
  }

  const mockProductService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndRemove: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductService,
        },
      ],
    }).compile();
    productsService = module.get<ProductsService>(ProductsService);
    model = module.get<Model<Product>>(getModelToken(Product.name));

  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('It should through exception', () => {
    it('should return an  products', async () => {
      await expect(productsService.findAll()).rejects.toThrow(
        new HttpException('Error fetching Products', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('It return all products', () => {
    it('should return an  products', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockProduct),
      } as any as any);
      const result = await productsService.findAll();
      expect(result).toEqual(mockProduct);
    });
  });


  describe('product return by findOneById', () => {
    it('should return an  product', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockProduct),
      } as any as any);
      const result = await productsService.findOne(mockProduct._id);
      expect(result).toEqual(mockProduct);
    });
  });


  describe('Product should be remove by findByIdAndRemove', () => {
    it('should Remove an  product', async () => {
      jest.spyOn(model, 'findByIdAndRemove').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockProduct),
      } as any as any);
      const result = await productsService.remove(mockProduct._id);
      expect(result).toEqual(mockProduct);
    });
  });


  describe('updateById', () => {
    it('should update and return a product', async () => {
      const updatedProduct = { ...mockProduct, name: 'Updated name' };
      const product = { name: 'Updated name' };

      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(updatedProduct),
      } as any as any);;
      const result = await productsService.update(mockProduct._id, product as any);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockProduct._id, product, {
        new: true,
      });
      expect(result.name).toEqual(product.name);
    });
  });

  it('should insert a new Product', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() => (mockProduct));
    const newProduct = await productsService.create(mockProduct);
    expect(newProduct).toEqual(mockProduct);
  });
});