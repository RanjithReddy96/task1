import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async findAll() {
        return this.productModel.find().exec();
    }

    async findOne(id: string) {
        const data = await this.productModel.findById(id).exec();
        if (data) {
            return data
        }
        return "No Data Found"
    }

    async create(createProductDto: CreateProductDto) {
        const product = new this.productModel(createProductDto);
        return product.save();
    }

    async update(id: string, createProductDto: CreateProductDto) {
        return this.productModel.findByIdAndUpdate(id, createProductDto, { new: true }).exec();
    }

    async remove(id: string) {
        return this.productModel.findByIdAndRemove(id).exec();
    }
}
