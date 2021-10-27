import { AxiosResponse } from 'axios';
import api from '../api';

export type Role = {
  id: string;
  name: string;
  label: string;
  module: {
    id: string;
    name: string;
  };
};

export type RoleData = {
  id: string;
  name: string;
  label: string;
  module: { id: string };
};

export type FilterRole = {
  params: {
    name: string;
    label: string;
  };
};

export const getRoles = (filter?: FilterRole): Promise<AxiosResponse<Role[]>> =>
  api.get('/roles', filter);

export const getRoleById = (id: string): Promise<AxiosResponse<Role>> =>
  api.get(`/roles/${id}`);

export const updateRole = (
  id: string,
  data: RoleData,
): Promise<AxiosResponse<Role>> => api.put(`/roles/${id}`, data);
