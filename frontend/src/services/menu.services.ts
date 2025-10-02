import httpRequest from '@/config/axios.config';
import { IMenu } from '@/interfaces/menu/menu.interface';

export const getMenu = async () => {
  const { data } = await httpRequest.get('/menu');
  return data;
};

export const upsertMenu = async (payload: { menu: IMenu[]; id: string }) => {
  const { data } = await httpRequest.post('/menu', payload);
  return data;
};
