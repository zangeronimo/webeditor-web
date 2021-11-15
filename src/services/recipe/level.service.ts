import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';

export type Level = {
  id: string;
  name: string;
  active: 0 | 1;
  company: {
    id: string;
    name: string;
  };
};

export type LevelData = {
  id?: string;
  name: string;
  active?: 0 | 1;
};

export type FilterLevel = BaseFilter & {
  params: {
    name?: string;
    active?: 0 | 1;
  };
};

export const getLevel = (
  filter?: FilterLevel,
): Promise<AxiosResponse<PaginationResult<Level>>> =>
  api.get('/recipe/levels', filter);

export const getLevelById = (id: string): Promise<AxiosResponse<Level>> =>
  api.get(`/recipe/levels/${id}`);

export const addLevel = (data: LevelData): Promise<AxiosResponse<Level>> =>
  api.post('/recipe/levels', data);

export const delLevel = (id: string): Promise<AxiosResponse<Level>> =>
  api.delete(`/recipe/levels/${id}`);

export const updateLevel = (
  id: string,
  data: LevelData,
): Promise<AxiosResponse<Level>> => api.put(`/recipe/levels/${id}`, data);
