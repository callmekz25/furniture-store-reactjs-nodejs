import httpRequest from '@/config/axios.config';

export const getCollections = async () => {
  const { data } = await httpRequest.get(`/get-collections`);
  return data;
};
