import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';

export type Role = {
  id: string;
  name: string;
  label: string;
  order: number;
  module: {
    id: string;
    name: string;
  };
};

export type RoleData = {
  id?: string;
  name: string;
  label: string;
  module: { id: string };
};

export type FilterRole = BaseFilter & {
  params: {
    search: string;
    moduleId: string;
  };
};

export const getRoles = (
  filter?: FilterRole,
): Promise<AxiosResponse<PaginationResult<Role>>> => api.get('/roles', filter);

export const getRoleById = (id: string): Promise<AxiosResponse<Role>> =>
  api.get(`/roles/${id}`);

export const updateOrder = (
  id: string,
  value: number,
): Promise<AxiosResponse<Role>> => api.patch(`/roles/${id}`, { order: value });

export const addRole = (data: RoleData): Promise<AxiosResponse<Role>> =>
  api.post('/roles', data);

export const updateRole = (
  id: string,
  data: RoleData,
): Promise<AxiosResponse<Role>> => api.put(`/roles/${id}`, data);

export const delRole = (id: string): Promise<AxiosResponse<Role>> =>
  api.delete(`/roles/${id}`);
