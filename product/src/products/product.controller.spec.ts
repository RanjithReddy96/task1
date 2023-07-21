import { ProductsService } from "./products.service";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { CreateProductDto } from "src/dto/create-product.dto";
import { Product } from "src/schemas/product.schema";
import { UpdateProductDto } from "src/dto/update-product.dto";

describe('ProductsController', () => {
    const mockProduct = [
        {
            _id: '61c0ccf11d7bf83d153d7c06',
            name: 'car',
            price: 20,
            description: 'car Description',
        },
        {
            _id: '61c0ccf11d7bf83d153d7c08',
            name: 'jeep',
            price: 20,
            description: 'jeep Description',
        }
    ];

    const mockSingleProduct = {
        _id: '61c0ccf11d7bf83d153d7c06',
        name: 'car',
        price: 20,
        description: 'car Description',
    };

    const mockProductService = {
        findAll: jest.fn().mockResolvedValueOnce(mockProduct),
        create: jest.fn(),
        findOne: jest.fn().mockResolvedValueOnce(mockSingleProduct),
        remove: jest.fn().mockResolvedValueOnce({ deleted: true }),
    };

    let productsService: ProductsService;
    let productsController: ProductsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ProductsController],
            providers: [
                {
                    provide: ProductsService,
                    useValue: mockProductService,
                },
            ],
        }).compile();

        productsService = module.get<ProductsService>(ProductsService);
        productsController = module.get<ProductsController>(ProductsController);
    });
    it('should be defined', () => {
        expect(ProductsController).toBeDefined();
    });

    describe('getProductById', () => {
        it('should get a product by ID', async () => {
            const result = await productsController.findOne(mockProduct[0]._id);
            expect(productsService.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockSingleProduct);
        });
    });
    describe('getProducts', () => {
        it('should get all products', async () => {
            const result = await productsController.findAll();
            expect(productsService.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockProduct);
        });
    });
    describe('createProduct', () => {
        it('should create a new book', async () => {
            const newProduct = {
                name: 'car',
                price: 20,
                description: 'car Description',
            };
            productsService.create = jest.fn().mockResolvedValueOnce(mockSingleProduct);
            const result = await productsController.create(
                newProduct as CreateProductDto,
            );
            expect(productsService.create).toHaveBeenCalled();
            expect(result).toEqual(mockSingleProduct);
        });
    });
    describe('updateProduct', () => {
        it('should update product by its ID', async () => {
            const updatedProduct = { ...mockSingleProduct, description: 'Updated name' };
            const product = { description: 'Updated name' };

            productsService.update = jest.fn().mockResolvedValueOnce(updatedProduct);

            const result = await productsController.update(
                mockSingleProduct._id,
                product as UpdateProductDto,
            );

            expect(productsService.update).toHaveBeenCalled();
            expect(result).toEqual(updatedProduct);
        });
    });
    describe('deleteProduct', () => {
        it('should delete a Product by ID', async () => {
            const result = await productsController.remove(mockProduct[0]._id);

            expect(productsService.remove).toHaveBeenCalled();
            expect(result).toEqual({ deleted: true });
        });
    });
});