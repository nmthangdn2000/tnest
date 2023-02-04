import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { CAPITALIZE, CAPITALIZEDocument } from 'PATH_SCHEMA';
import { CAPITALIZEDto } from 'PATH_DTO';
import { CAPITALIZEFilterDto } from 'PATH_FILTER_DTO';

@Injectable()
export class CAPITALIZEService {
  constructor(
    @InjectModel(CAPITALIZE.name)
    private readonly NAMEModel: Model<CAPITALIZEDocument>
  ) {}

  async getAll(filter: CAPITALIZEFilterDto) {
    const { limit, page } = filter;
    const query = {};

    const countDocument = this.NAMEModel.countDocuments(query);
    const getCAPITALIZE = this.NAMEModel.find(query)
      .skip(page * limit - limit)
      // .sort(sort)
      .limit(limit);

    const [total, NAMEs] = await Promise.all([countDocument, getCAPITALIZE]);

    return {
      totalPage: pagination(total, limit),
      currentPage: page,
      data: NAMEs,
    };
  }

  async getById(id: string) {
    const NAME = await this.NAMEModel.findById(id).lean();
    if (!NAME) throw new Error(`CAPITALIZE with id is ${id} does not exist`);
    return NAME;
  }

  async create(data: CAPITALIZEDto) {
    const NAMEInstance = plainToInstance(CAPITALIZE, data);
    const newCAPITALIZE = new this.NAMEModel(NAMEInstance);
    return newCAPITALIZE.save();
  }

  async updateById(id: string, data: CAPITALIZEDto) {
    const NAME = await this.NAMEModel.findById(id).lean();
    if (!NAME) throw new Error(`CAPITALIZE with id is ${id} does not exist`);

    const NAMEInstance = plainToInstance(CAPITALIZE, data);

    removeKeyUndefined(NAMEInstance);

    return this.NAMEModel.findByIdAndUpdate(id, { ...NAME, ...NAMEInstance, updatedAt: new Date() }, { new: true });
  }

  async deleteById(id: string) {
    const NAME = await this.NAMEModel.findById(id).lean();
    if (!NAME) throw new Error(`CAPITALIZE with id is ${id} does not exist`);
    return this.NAMEModel.deleteOne({ _id: id });
  }
}
