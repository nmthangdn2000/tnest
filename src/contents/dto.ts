import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CAPITALIZEDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  example1: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  example2: string;
}
