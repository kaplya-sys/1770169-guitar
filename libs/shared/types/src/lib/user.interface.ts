import {Role} from '@1770169-guitar/models';

export interface User {
  id?: string;
  name: string;
  email: string;
  role?: Role;
  createdAt?: Date;
}
