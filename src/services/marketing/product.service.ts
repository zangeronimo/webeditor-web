import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';
import { Category } from './category.service';

export type Product = {
  id: string;
  slug: string;
  banner: string;
  title: string;
  url: string;
  content: string;
  active: 0 | 1;
  category: Category;
  company: {
    id: string;
    name: string;
  };
};

export type ProductData = {
  id?: string;
  file?: string;
  title: string;
  url: string;
  content: string;
  categoryId: string;
  active?: 0 | 1;
};

export type FilterProduct = BaseFilter & {
  params: {
    slug?: string;
    title?: string;
    categoryId?: string;
    active?: 0 | 1;
  };
};

export const getProduct = (
  filter?: FilterProduct,
): Promise<AxiosResponse<PaginationResult<Product>>> =>
  api.get('/marketing/products', filter);

export const getProductById = (id: string): Promise<AxiosResponse<Product>> =>
  api.get(`/marketing/products/${id}`);

export const addProduct = (
  data: ProductData,
): Promise<AxiosResponse<Product>> => api.post('/marketing/products', data);

export const delProduct = (id: string): Promise<AxiosResponse<Product>> =>
  api.delete(`/marketing/products/${id}`);

export const updateProduct = (
  id: string,
  data: ProductData,
): Promise<AxiosResponse<Product>> =>
  api.put(`/marketing/products/${id}`, data);
