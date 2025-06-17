import httpRequest from "./config";

export const getAll = async <T>(
  url: string,
  credential: boolean = false,
  pathParams?: string | number,
  queryParams?: {
    [key: string]: string | number;
  },
  pageParam?: number
) => {
  const urlFinal = pathParams ? `${url}/${pathParams}` : url;
  try {
    const { data } = await httpRequest.get<T>(urlFinal, {
      params: {
        ...queryParams,
        page: pageParam,
      },
      withCredentials: credential,
    });
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};

export const getOne = async <T>(
  url: string,
  credential: boolean = false,
  pathParams?: string | number
) => {
  const urlFinal = pathParams ? `${url}/${pathParams}` : url;
  try {
    const { data } = await httpRequest.get<T>(urlFinal, {
      withCredentials: credential,
    });
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};
