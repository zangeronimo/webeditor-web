import { AxiosResponse } from 'axios';
import api from '../api';
import { BaseFilter, PaginationResult } from '../BaseTypes';
import { Module } from './module.service';

export type Company = {
  id: string;
  name: string;
  modules: Module[];
};

export type CompanyData = {
  id?: string;
  name: string;
  modules: { id: string }[];
};

export type FilterCompany = BaseFilter & {
  params: {
    name: string;
  };
};

export const getCompanies = (
  filter?: FilterCompany,
): Promise<AxiosResponse<PaginationResult<Company>>> =>
  api.get('/companies', filter);

export const getCompanyById = (id: string): Promise<AxiosResponse<Company>> =>
  api.get(`/companies/${id}`);

export const addCompany = (
  data: CompanyData,
): Promise<AxiosResponse<Company>> => api.post('/companies', data);

export const updateCompany = (
  id: string,
  data: CompanyData,
): Promise<AxiosResponse<Company>> => api.put(`/companies/${id}`, data);

export const delCompany = (id: string): Promise<AxiosResponse<Company>> =>
  api.delete(`/companies/${id}`);
