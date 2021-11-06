import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';

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
  id?: string;
  name: string;
  email: string;
  password?: string;
  roles: { id: string }[];
};

export type FilterUser = BaseFilter & {
  params: {
    name: string;
    email: string;
  };
};

export const getUser = (
  filter?: FilterUser,
): Promise<AxiosResponse<PaginationResult<User>>> => api.get('/users', filter);

export const getUserById = (id: string): Promise<AxiosResponse<User>> =>
  api.get(`/users/${id}`);

export const addUser = (data: UserData): Promise<AxiosResponse<User>> =>
  api.post('/users', data);

export const delUser = (id: string): Promise<AxiosResponse<User>> =>
  api.delete(`/users/${id}`);

export const updateUser = (
  id: string,
  data: UserData,
): Promise<AxiosResponse<User>> => api.put(`/users/${id}`, data);
