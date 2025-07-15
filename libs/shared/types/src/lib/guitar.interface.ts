import {GuitarType, GuitarStrings} from '@1770169-guitar/models';
import {Image} from './image.interface';

export interface Guitar {
  id?: string;
  title: string;
  description: string;
  date: Date;
  image: Image | string;
  type: GuitarType;
  stringCount: GuitarStrings;
  price: number;
  article: string
}
