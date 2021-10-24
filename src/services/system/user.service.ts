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

export type UserData = {
  id: string;
  name: string;
  email: string;
  roles: { id: string }[];
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

export const updateUser = (
  id: string,
  data: UserData,
): Promise<AxiosResponse<User>> => api.put(`/users/${id}`, data);
