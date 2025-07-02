import httpRequest from "../config/axios.config";

export const getAll = async <T>(
  url: string,
  credential: boolean = false,
  pathParams?: string | number,
  queryParams?: {
    [key: string]: string | number | string[];
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

export const addNew = async <T>(
  url: string,
  request: T,
  pathParams?: string | number
) => {
  try {
    const urlFinal = pathParams ? `${url}/${pathParams}` : url;
    const { data } = await httpRequest.post(urlFinal, {
      request,
    });
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};
export const updateOne = async <T>(
  url: string,
  request: T,
  pathParams?: string | number,
  queryParams?: {
    [key: string]: string | number | string[];
  }
) => {
  try {
    const urlFinal = pathParams ? `${url}/${pathParams}` : url;
    const { data } = await httpRequest.patch(urlFinal, {
      request,
      params: queryParams,
    });
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};
export const deleteOne = async (
  url: string,
  pathParams?: string | number,
  queryParams?: {
    [key: string]: string | number | string[];
  }
) => {
  try {
    const urlFinal = pathParams ? `${url}/${pathParams}` : url;
    const { data } = await httpRequest.delete(urlFinal, {
      params: queryParams,
    });
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};
