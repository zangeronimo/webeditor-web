import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';
import { Role } from './role.service';

export type Module = {
  id: string;
  name: string;
  roles: Role[];
};

export type ModuleData = {
  id?: string;
  name: string;
};

export type FilterModule = BaseFilter & {
  params: {
    name: string;
  };
};

export const getModules = (
  filter?: FilterModule,
): Promise<AxiosResponse<PaginationResult<Module>>> =>
  api.get('/modules', filter);

export const getModuleById = (id: string): Promise<AxiosResponse<Module>> =>
  api.get(`/modules/${id}`);

export const addModule = (data: ModuleData): Promise<AxiosResponse<Module>> =>
  api.post('/modules', data);

export const updateModule = (
  id: string,
  data: ModuleData,
): Promise<AxiosResponse<Module>> => api.put(`/modules/${id}`, data);

export const delModule = (id: string): Promise<AxiosResponse<Module>> =>
  api.delete(`/modules/${id}`);

export const getModulesByUser = (): Promise<AxiosResponse<Module[]>> =>
  api.get<Module[]>('/modules/user');
