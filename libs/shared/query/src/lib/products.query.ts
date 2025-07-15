import {IsOptional, IsNumber, IsEnum} from 'class-validator';
import {Transform} from 'class-transformer';

import {GuitarStrings, GuitarType} from '@1770169-guitar/models';
import {Query, SortDirection} from '@1770169-guitar/types';

import {DEFAULT_PAGE_COUNT} from './query.constant';

export class ProductsQuery implements Query {
  @IsEnum(GuitarType, {each: true})
  @IsOptional()
  public types?: GuitarType[];

  @IsEnum(GuitarStrings, {each: true})
  @IsOptional()
  public strings?: GuitarStrings[];

  @IsEnum(SortDirection)
  @IsOptional()
  public price?: SortDirection;

  @IsEnum(SortDirection)
  @IsOptional()
  public date?: SortDirection;

  @Transform(({value}) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;
}
