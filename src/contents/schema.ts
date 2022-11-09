import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CAPITALIZEDocument = CAPITALIZE & Document;

@Schema({ timestamps: true, versionKey: false })
export class CAPITALIZE {
  @Prop()
  example1: string;

  @Prop()
  example2: number;
}

export const CAPITALIZESchema = SchemaFactory.createForClass(CAPITALIZE);
