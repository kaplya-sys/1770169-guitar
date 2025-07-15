import {GuitarStrings, GuitarType} from '@1770169-guitar/models';

import {SortDirection} from './sort-direction.enum';

export interface Query {
  page?: number;
  types?: GuitarType[];
  strings?: GuitarStrings[];
  price?: SortDirection;
  date?: SortDirection;
}
