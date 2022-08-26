
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/apis/product/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAll() {
    return;
  }

  async getById() {
    return;
  }

  async create() {
    return;
  }

  async updateById() {
    return;
  }

  async deleteById() {
    return;
  }
}

  