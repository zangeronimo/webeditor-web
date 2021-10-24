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

export const getRoles = (): Promise<AxiosResponse<Role[]>> => api.get('/roles');
