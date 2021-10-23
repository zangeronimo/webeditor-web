import { AxiosResponse } from 'axios';
import api from '../api';

export type User = {
  id: string;
  name: string;
  email: string;
  company: {
    id: string;
    name: string;
  };
  roles: [
    {
      id: string;
      name: string;
      label: string;
    },
  ];
};

export type FilterUser = {
  params: {
    name: string;
    email: string;
  };
};

export const getUser = (filter?: FilterUser): Promise<AxiosResponse<User[]>> =>
  api.get('/users', filter);

export const getUserById = (id: string): Promise<AxiosResponse<User>> =>
  api.get(`/users/${id}`);
