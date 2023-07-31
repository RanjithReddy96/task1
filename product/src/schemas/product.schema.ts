import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;


  @Prop()
  price: number;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
