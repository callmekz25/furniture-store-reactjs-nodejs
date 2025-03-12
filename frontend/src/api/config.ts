import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
httpRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Khi không có access token bắt đăng nhập
    if (
      error.response.status === 401 &&
      error.response.data.mess === "Unauthorized"
    ) {
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default httpRequest;
