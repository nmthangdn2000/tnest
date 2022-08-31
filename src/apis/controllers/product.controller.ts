
import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/apis/services/product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get all product' })
  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  @ApiOperation({ summary: 'Get a product by id' })
  @Get(':id')
  async getById() {
    return this.productService.getById();
  }

  @ApiOperation({ summary: 'Create a product' })
  @Post()
  async create() {
    return this.productService.create();
  }

  @ApiOperation({ summary: 'Update a product' })
  @Put(':id')
  async updateById() {
    return this.productService.updateById();
  }

  @ApiOperation({ summary: 'Delete a product' })
  @Delete(':id')
  async deleteById() {
    return await this.productService.deleteById();
  }
}
  