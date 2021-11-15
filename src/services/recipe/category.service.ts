import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';
import { Level } from './level.service';

export type Category = {
  id: string;
  name: string;
  active: 0 | 1;
  level: Level;
  company: {
    id: string;
    name: string;
  };
};

export type CategoryData = {
  id?: string;
  name: string;
  levelId: string;
  active?: 0 | 1;
};

export type FilterCategory = BaseFilter & {
  params: {
    name?: string;
    levelId?: string;
    active?: 0 | 1;
  };
};

export const getCategory = (
  filter?: FilterCategory,
): Promise<AxiosResponse<PaginationResult<Category>>> =>
  api.get('/recipe/categories', filter);

export const getCategoryById = (id: string): Promise<AxiosResponse<Category>> =>
  api.get(`/recipe/categories/${id}`);

export const addCategory = (
  data: CategoryData,
): Promise<AxiosResponse<Category>> => api.post('/recipe/categories', data);

export const delCategory = (id: string): Promise<AxiosResponse<Category>> =>
  api.delete(`/recipe/categories/${id}`);

export const updateCategory = (
  id: string,
  data: CategoryData,
): Promise<AxiosResponse<Category>> =>
  api.put(`/recipe/categories/${id}`, data);
