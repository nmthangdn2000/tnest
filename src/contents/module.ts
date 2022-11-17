import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CAPITALIZEController } from 'PATH_CONTROLLER';
import { CAPITALIZEService } from 'PATH_SERVICE';
import { CAPITALIZE, CAPITALIZESchema } from 'PATH_SCHEMA';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CAPITALIZE.name,
        schema: CAPITALIZESchema,
      },
    ]),
  ],
  controllers: [CAPITALIZEController],
  providers: [CAPITALIZEService],
})
export class CAPITALIZEModule {}
