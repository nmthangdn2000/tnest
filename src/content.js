import { capitalizeFirstLetter } from './method.js';

const replaceCapitalizeName = /CAPITALIZE/g;
const replaceName = /NAME/g;
const replacePathController = /PATH_CONTROLLER/g;
const replacePathSchema = /PATH_SCHEMA/g;
const replacePathService = /PATH_SERVICE/g;

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

export const ${capitalizeFirstLetter(name)}Schema = SchemaFactory.createForClass(${capitalizeFirstLetter(name)});
  `;
};

export const contentController = (name, path) => {
  return `import { Controller, Get, Post, Put, Delete, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ${capitalizeFirstLetter(name)}Service } from '${path.replace(/.ts/g, '')}';

@ApiTags('${name}s')
@Controller('${name}s')
export class ${capitalizeFirstLetter(name)}Controller {
  constructor(private readonly ${name}Service: ${capitalizeFirstLetter(name)}Service) {}

  private readonly logger = new Logger(${capitalizeFirstLetter(name)}Controller.name);

  @ApiOperation({ summary: 'Get all ${name}' })
  @Get()
  async getAll() {
    try {
      const result = await this.${name}Service.getAll();
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Get a ${name} by id' })
  @Get(':id')
  async getById() {
    try {
      const result = await this.${name}Service.getById();
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Create a ${name}' })
  @Post()
  async create() {
    try {
      const result = await this.${name}Service.create();
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Update a ${name}' })
  @Put(':id')
  async updateById() {
    try {
      const result = await this.${name}Service.updateById();
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Delete a ${name}' })
  @Delete(':id')
  async deleteById() {
    try {
      const result = await this.${name}Service.deleteById();
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
}`;
};

export const contentService = (name, path) => {
  return `
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ${capitalizeFirstLetter(name)}, ${capitalizeFirstLetter(name)}Document } from '${path.replace(/.ts/g, '')}';

@Injectable()
export class ${capitalizeFirstLetter(name)}Service {
  constructor(
    @InjectModel(${capitalizeFirstLetter(name)}.name)
    private readonly ${name}Model: Model<${capitalizeFirstLetter(name)}Document>,
  ) {}

  async getAll() {
    return;
  }

  async getById(id: string) {
    const ${name} = await this.${name}Model.findById(id).lean();
    if(!${name}) throw new Error('${capitalizeFirstLetter(name)} with id is ')
    return ${name};
  }

  async create(data: ${capitalizeFirstLetter(name)}Dto) {
    const ${name}Instance = plainToInstance(${capitalizeFirstLetter(name)}, data);
    const new${capitalizeFirstLetter(name)} = new this.${name}Model(${name}Instance);
    return new${capitalizeFirstLetter(name)}.save();
  }

  async updateById() {
    return;
  }

  async deleteById() {
    return;
  }
}`;
};

export const contentModule = (name, path) => {
  return `import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ${capitalizeFirstLetter(name)}Controller } from '${path.controller.replace(/.ts/g, '')}';
import { ${capitalizeFirstLetter(name)}Service } from '${path.service.replace(/.ts/g, '')}';
import { ${capitalizeFirstLetter(name)}, ${capitalizeFirstLetter(name)}Schema } from '${path.schema.replace(/.ts/g, '')}';

@Module({
  imports: [MongooseModule.forFeature([{ name: ${capitalizeFirstLetter(name)}.name, schema: ${capitalizeFirstLetter(name)}Schema }])],
  controllers: [${capitalizeFirstLetter(name)}Controller],
  providers: [${capitalizeFirstLetter(name)}Service],
})

export class ${capitalizeFirstLetter(name)}Module {}
`;
};
