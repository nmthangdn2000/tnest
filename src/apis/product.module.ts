import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from 'src/apis/controllers/product.controller';
import { ProductService } from 'src/apis/services/product.service';
import { Product, ProductSchema } from 'src/apis/schemas/product.schema';
import { ProductModule } from 'src/apis/product.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
