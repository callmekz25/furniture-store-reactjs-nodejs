import { IMenu } from '@/interfaces/menu/menu.interface';
import { getMenu, upsertMenu } from '@/services/menu.services';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetMenu = () => {
  return useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });
};

export const useUpsertMenu = () => {
  return useMutation({
    mutationFn: (payload: { menu: IMenu[]; id: string }) => upsertMenu(payload),
  });
};
