import {
  IsString,
  IsNotEmpty,
  IsObject,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
  IsOptional,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';

import { Type } from 'class-transformer';
import { CuisineEnum } from 'src/common/enums/cuisine.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';


class NameDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  ar: string;
}

class LocationDto {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: number[];
}

export class RestaurantDto {
  @IsObject()
  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ArrayNotEmpty()
  @IsEnum(CuisineEnum, { each: true })
  cuisines: CuisineEnum[];

  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}


export class FindRestaurantDto {
  @ApiPropertyOptional({ enum: CuisineEnum })
  @IsOptional()
  @IsEnum(CuisineEnum)
  cuisine?: CuisineEnum;
}