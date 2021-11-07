import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';

export type Page = {
  id: string;
  title: string;
  content: string;
  active: number;
  company: {
    id: string;
    name: string;
  };
};

export type PageData = {
  id?: string;
  title: string;
  content: string;
  active?: number;
};

export type FilterPage = BaseFilter & {
  params: {
    title: string;
  };
};

export const getPage = (
  filter?: FilterPage,
): Promise<AxiosResponse<PaginationResult<Page>>> =>
  api.get('/institutional/pages', filter);

export const getPageById = (id: string): Promise<AxiosResponse<Page>> =>
  api.get(`/institutional/pages/${id}`);

export const addPage = (data: PageData): Promise<AxiosResponse<Page>> =>
  api.post('/institutional/pages', data);

export const delPage = (id: string): Promise<AxiosResponse<Page>> =>
  api.delete(`/institutional/pages/${id}`);

export const updatePage = (
  id: string,
  data: PageData,
): Promise<AxiosResponse<Page>> => api.put(`/institutional/pages/${id}`, data);
