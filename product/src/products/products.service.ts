import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    
    async findAll() {
        try {
            return this.productModel.find().exec();
        } catch (error) {
            throw new HttpException('Error fetching Products', HttpStatus.BAD_REQUEST);
        }
    }

    async findOne(id: string) {
        const data = await this.productModel.findById(id).exec();
        if (!data) {
            throw new NotFoundException('Could not find Product.');
        }
        return data;
    }

    async create(createProductDto: CreateProductDto) {
        try {
            const product = await this.productModel.create(createProductDto as any);

            return product
        } catch (error) {
            throw new HttpException('Error Creating Product', HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        try {

            return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
        } catch (error) {
            throw new HttpException('Error updating Product', HttpStatus.BAD_REQUEST);
        }
    }

    async remove(id: string) {
        try {
            return this.productModel.findByIdAndRemove(id).exec();
        } catch (error) {
            throw new HttpException('Error deleting Product', HttpStatus.BAD_REQUEST);
        }
    }
}
