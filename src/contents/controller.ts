import { Controller, Get, Post, Put, Delete, Param, Body, Query, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CAPITALIZEService } from 'PATH_SERVICE';
import { CAPITALIZEDto } from 'PATH_DTO';
import { CAPITALIZEFilterDto } from 'PATH_FILTER_DTO';

@ApiTags('NAMEs')
@Controller('NAMEs')
export class CAPITALIZEController {
  constructor(private readonly NAMEService: CAPITALIZEService) {}

  private readonly logger = new Logger(CAPITALIZEController.name);

  @ApiOperation({ summary: 'Get all NAME' })
  @Get()
  async getAll(@Query() filter: CAPITALIZEFilterDto) {
    try {
      const result = await this.NAMEService.getAll(filter);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Get a NAME by id' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const result = await this.NAMEService.getById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Create a NAME' })
  @Post()
  async create(@Body() data: CAPITALIZEDto) {
    try {
      const result = await this.NAMEService.create(data);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Update a NAME' })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() data: CAPITALIZEDto) {
    try {
      const result = await this.NAMEService.updateById(id, data);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Delete a NAME' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      const result = await this.NAMEService.deleteById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
}
