import { AxiosResponse } from 'axios';
import api from '../api';
import { Role } from './role.service';

export type Module = {
  id: string;
  name: string;
  roles: Role[];
};

export const getModules = (): Promise<AxiosResponse<Module[]>> =>
  api.get<Module[]>('/modules');
