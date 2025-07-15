import {GuitarStrings, GuitarType} from '@1770169-guitar/models';

export interface CreateGuitar {
  title: string;
  type: GuitarType;
  stringCount: GuitarStrings;
  description: string;
  date: Date;
  price: number;
  article: string;
}
