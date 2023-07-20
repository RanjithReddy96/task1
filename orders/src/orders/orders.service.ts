import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CreateOrderDto } from 'src/dto/create-order.dto';


@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) { }

  async findAll(): Promise<Order[]> {
    try {
      return this.orderModel.find().exec();
    } catch (error) {
      throw new HttpException('Error frtching Orders', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      const data = this.orderModel.findById(id).exec();
      if (!data) {
        throw new NotFoundException('Could not find Orders.');
      }
      return data;
    } catch (error) {
      throw new HttpException('Error frtching Orders', HttpStatus.BAD_REQUEST);
    }
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {

      const createdOrder = new this.orderModel(createOrderDto);
      return createdOrder.save();
    } catch (error) {
      throw new HttpException('Error Creating Order', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    } catch (error) {
      throw new HttpException('Error updating Order', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<Order> {
    try {
      return this.orderModel.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new HttpException('Error deleting Order', HttpStatus.BAD_REQUEST);
    }
  }
}
