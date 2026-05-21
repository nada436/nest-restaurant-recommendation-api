import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsEnum,
} from 'class-validator';
import { CuisineEnum } from 'src/common/enums/cuisine.enum';

export class UseDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsArray()
  @IsEnum(CuisineEnum, { each: true })
  favoriteCuisines: CuisineEnum[];
}