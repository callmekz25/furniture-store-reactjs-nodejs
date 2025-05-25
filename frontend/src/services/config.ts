import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
httpRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // Khi không có access token bắt đăng nhập
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        await httpRequest.post("/refresh-token");
        return httpRequest(originalRequest);
      } catch (error) {
        await httpRequest.post("/logout");
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

const httpContentful = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${
    import.meta.env.VITE_SPACE_ID
  }/environments/master`,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
  },
});
export { httpContentful };
export default httpRequest;
