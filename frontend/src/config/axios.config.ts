import { BASE_URL, CONTENT_FUL_ACCESS_TOKEN, SPACE_ID } from "@/constants/env";
import axios from "axios";
import { toast } from "sonner";
declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}
const httpRequest = axios.create({
  baseURL: BASE_URL,
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
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      try {
        await httpRequest.post("/refresh-token");
        return httpRequest(originalRequest);
      } catch (error) {
        await httpRequest.post("/logout");
        window.location.href = "/signin";
      }
    }
    const errors = error.response?.data?.errors;
    const message = error.response?.data?.message || "Đã có lỗi xảy ra";

    if (Array.isArray(errors) && errors.length) {
      console.error(errors.map((e) => `${e.path}: ${e.msg}`).join(", "));
    }
    toast.error(message, {
      position: "top-right",
    });
    return Promise.reject(new Error(error));
  }
);

const httpContentful = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`,
  headers: {
    Authorization: `Bearer ${CONTENT_FUL_ACCESS_TOKEN}`,
  },
});
export { httpContentful };
export default httpRequest;
