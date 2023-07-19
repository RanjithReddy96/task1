import mongoose, { Schema, Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
}

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String},
  price: { type: Number, required: true },
});
