import {Role} from '@1770169-guitar/models';

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role?: Role;
}
