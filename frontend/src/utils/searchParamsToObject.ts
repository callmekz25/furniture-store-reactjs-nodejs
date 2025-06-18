const searchParamsToObject = (
  params: URLSearchParams
): Record<string, string | string[]> => {
  const obj: Record<string, string | string[]> = {};

  for (const [key, value] of params.entries()) {
    if (obj[key]) {
      obj[key] = Array.isArray(obj[key])
        ? [...(obj[key] as string[]), value]
        : [obj[key] as string, value];
    } else {
      obj[key] = value;
    }
  }

  return obj;
};
export default searchParamsToObject;
