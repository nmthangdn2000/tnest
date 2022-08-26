import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from 'src/apis/product/product.controller';
import { ProductService } from 'src/apis/product/product.service';
import { Product, ProductSchema } from 'src/apis/product/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService],
})

export class ProductModule {}
