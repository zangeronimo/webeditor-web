import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';
import { Recipe } from './recipe.service';

export type Rate = {
  id: string;
  rate: number;
  comment: string;
  active: 0 | 1;
  recipe: Recipe;
  company: {
    id: string;
    name: string;
  };
};

export type RateData = {
  id?: string;
  rate: number;
  comment: string;
  recipeId: string;
  active?: 0 | 1;
};

export type FilterRate = BaseFilter & {
  params: {
    rate?: number;
    recipeId?: string;
    active?: 0 | 1;
  };
};

export const getRate = (
  filter?: FilterRate,
): Promise<AxiosResponse<PaginationResult<Rate>>> =>
  api.get('/recipe/ratings', filter);

export const getRateById = (id: string): Promise<AxiosResponse<Rate>> =>
  api.get(`/recipe/ratings/${id}`);

export const addRate = (data: RateData): Promise<AxiosResponse<Rate>> =>
  api.post('/recipe/ratings', data);

export const delRate = (id: string): Promise<AxiosResponse<Rate>> =>
  api.delete(`/recipe/ratings/${id}`);

export const updateRate = (
  id: string,
  data: RateData,
): Promise<AxiosResponse<Rate>> => api.put(`/recipe/ratings/${id}`, data);
