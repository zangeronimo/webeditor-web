import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';
import { Category } from './category.service';

export type Recipe = {
  id: string;
  slug: string;
  name: string;
  ingredients: string;
  preparation: string;
  active: 0 | 1;
  category: Category;
  company: {
    id: string;
    name: string;
  };
};

export type RecipeData = {
  id?: string;
  name: string;
  ingredients: string;
  preparation: string;
  categoryId: string;
  active?: 0 | 1;
};

export type FilterRecipe = BaseFilter & {
  params: {
    slug?: string;
    name?: string;
    categoryId?: string;
    active?: 0 | 1;
  };
};

export const getRecipe = (
  filter?: FilterRecipe,
): Promise<AxiosResponse<PaginationResult<Recipe>>> =>
  api.get('/recipe/recipes', filter);

export const getRecipeById = (id: string): Promise<AxiosResponse<Recipe>> =>
  api.get(`/recipe/recipes/${id}`);

export const addRecipe = (data: RecipeData): Promise<AxiosResponse<Recipe>> =>
  api.post('/recipe/recipes', data);

export const delRecipe = (id: string): Promise<AxiosResponse<Recipe>> =>
  api.delete(`/recipe/recipes/${id}`);

export const updateRecipe = (
  id: string,
  data: RecipeData,
): Promise<AxiosResponse<Recipe>> => api.put(`/recipe/recipes/${id}`, data);
