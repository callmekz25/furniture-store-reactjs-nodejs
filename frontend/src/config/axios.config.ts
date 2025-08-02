import { BASE_URL, CONTENT_FUL_ACCESS_TOKEN, SPACE_ID } from "@/constants/env";
import axios from "axios";
import { toast } from "sonner";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}

// Tracking refresh state để tránh infinite loop
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}> = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(null);
    }
  });

  failedQueue = [];
};

const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Refresh token function
const refreshToken = async () => {
  const response = await httpRequest.post(
    "/refresh-token",
    {},
    {
      skipAuthRefresh: true, // Quan trọng: Skip interceptor cho refresh request
      _retry: true,
    }
  );
  return response;
};

// Logout function
const performLogout = async (force = false) => {
  try {
    if (!force) {
      await httpRequest.post(
        "/logout",
        {},
        {
          skipAuthRefresh: true,
          timeout: 5000,
        }
      );
    }
  } catch (error) {
    console.log("Logout API failed, forcing local logout");
  } finally {
    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    window.location.href = "/signin";
  }
};

httpRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu là refresh token request bị lỗi → logout ngay
    if (
      originalRequest.url?.includes("/refresh-token") &&
      error.response?.status === 401
    ) {
      isRefreshing = false;
      processQueue(error, null);
      toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại", {
        position: "top-right",
      });
      await performLogout(true);
      return Promise.reject(error);
    }

    // Nếu là logout request bị lỗi → không retry
    if (originalRequest.url?.includes("/logout")) {
      return Promise.reject(error);
    }

    // Handle 401 errors
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      // Nếu đang refresh, queue request này
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            httpRequest(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshToken();
        processQueue(null);

        // Retry original request
        return httpRequest(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
        await performLogout(true);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    const errors = error.response?.data?.errors;
    const message = error.response?.data?.message || "Đã có lỗi xảy ra";

    if (Array.isArray(errors) && errors.length) {
      console.error(errors.map((e: any) => `${e.path}: ${e.msg}`).join(", "));
    }

    // Không show toast cho 401 errors (đã handle ở trên)
    if (error.response?.status !== 401) {
      toast.error(message, {
        position: "top-right",
      });
    }

    return Promise.reject(error);
  }
);

const httpContentful = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`,
  headers: {
    Authorization: `Bearer ${CONTENT_FUL_ACCESS_TOKEN}`,
  },
});

// Add timeout cho tất cả requests
httpRequest.defaults.timeout = 30000; // 30 seconds
httpContentful.defaults.timeout = 30000;

// Optional: Add request interceptor để log
httpRequest.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { httpContentful };
export default httpRequest;
