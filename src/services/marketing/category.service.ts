import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';

export type Category = {
  id: string;
  name: string;
  active: 0 | 1;
  company: {
    id: string;
    name: string;
  };
};

export type CategoryData = {
  id?: string;
  name: string;
  active?: 0 | 1;
};

export type FilterCategory = BaseFilter & {
  params: {
    name?: string;
    active?: 0 | 1;
  };
};

export const getCategory = (
  filter?: FilterCategory,
): Promise<AxiosResponse<PaginationResult<Category>>> =>
  api.get('/marketing/categories', filter);

export const getCategoryById = (id: string): Promise<AxiosResponse<Category>> =>
  api.get(`/marketing/categories/${id}`);

export const addCategory = (
  data: CategoryData,
): Promise<AxiosResponse<Category>> => api.post('/marketing/categories', data);

export const delCategory = (id: string): Promise<AxiosResponse<Category>> =>
  api.delete(`/marketing/categories/${id}`);

export const updateCategory = (
  id: string,
  data: CategoryData,
): Promise<AxiosResponse<Category>> =>
  api.put(`/marketing/categories/${id}`, data);
