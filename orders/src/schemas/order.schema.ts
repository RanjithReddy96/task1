import mongoose, { Schema, Document } from 'mongoose';

export interface Order extends Document {
  readonly id: string;
  readonly customerName: string;
  readonly amount: number;
  readonly createdAt: Date;
}

export const OrderSchema =new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  }
);
