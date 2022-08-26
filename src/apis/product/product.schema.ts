
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({timestamps: true, versionKey: false})
export class Product {
  @Prop()
  example1: string;

  @Prop()
  example2: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
  