import { AxiosResponse } from 'axios';
import api from '../api';

export type User = {
  id: string;
  name: string;
  email: string;
  company: {
    id: string;
    name: string;
  };
  roles: [
    {
      id: string;
      name: string;
      label: string;
    },
  ];
};

export const getUser = (): Promise<AxiosResponse<User[]>> => {
  return api.get('/users');
};
