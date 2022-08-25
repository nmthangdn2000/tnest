import { capitalizeFirstLetter } from './method.js';

export const contentSchema = (name) => {
  return `
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ${capitalizeFirstLetter(name)}Document = ${capitalizeFirstLetter(name)} & Document;

@Schema({timestamps: true, versionKey: false})
export class ${capitalizeFirstLetter(name)} {
  @Prop()
  example1: string;

  @Prop()
  example2: number;
}

export const ${name}Schema = SchemaFactory.createForClass(${capitalizeFirstLetter(name)});
  `;
};

export const contentController = (name, path) => {
  return `
import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ${capitalizeFirstLetter(name)}Service } from '${path}';

@ApiTags('${name}')
@Controller('${name}')
export class ${capitalizeFirstLetter(name)}Controller {
  constructor(private readonly ${name}Service: ${capitalizeFirstLetter(name)}Service) {}

  @ApiOperation({ summary: 'Get all ${name}' })
  @Get()
  async getAll() {
    return this.${name}Service.getAll();
  }

  @ApiOperation({ summary: 'Get a ${name} by id' })
  @Get(':id')
  async getById() {
    return this.${name}Service.getById();
  }

  @ApiOperation({ summary: 'Create a ${name}' })
  @Post()
  async create() {
    return this.${name}Service.create();
  }

  @ApiOperation({ summary: 'Update a ${name}' })
  @Put(':id')
  async updateById() {
    return this.${name}Service.updateById();
  }

  @ApiOperation({ summary: 'Delete a ${name}' })
  @Delete(':id')
  async deleteById() {
    return await this.${name}Service.deleteById();
  }
}
  `;
};

export const contentService = (name, path) => {
  return `
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ${capitalizeFirstLetter(name)}, ${capitalizeFirstLetter(name)}Document } from '${path}';

@Injectable()
export class ${capitalizeFirstLetter(name)}Service {
  constructor(
    @InjectModel(${capitalizeFirstLetter(name)}.name)
    private readonly ${name}Model: Model<${capitalizeFirstLetter(name)}Document>,
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

  `;
};
