import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async findAll() {
        try {
            return this.productModel.find().exec();
        } catch (error) {
            throw new HttpException('Error frtching Products', HttpStatus.BAD_REQUEST);
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
            const product = new this.productModel(createProductDto);
            return product.save();
        } catch (error) {
            throw new HttpException('Error Creating Product', HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, createProductDto: CreateProductDto) {
        try {

            return this.productModel.findByIdAndUpdate(id, createProductDto, { new: true }).exec();
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
