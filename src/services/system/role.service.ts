import { AxiosResponse } from 'axios';
import api from '../api';

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

export type FilterRole = {
  params: {
    name: string;
    label: string;
    moduleId: string;
    order: { field: string; order: string };
  };
};

export const getRoles = (filter?: FilterRole): Promise<AxiosResponse<Role[]>> =>
  api.get('/roles', filter);

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
