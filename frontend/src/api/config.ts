import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:8000/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
httpRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Khi không có access token bắt đăng nhập
    if (error.response.status === 401) {
      window.location.href = "/signin";
    }
    // Token hết hạn hoặc sai
    if (error.response.status === 403) {
      try {
        await httpRequest.post("/refresh-token");
        return httpRequest(error.config);
      } catch (err: any) {
        console.log("Refresh token failed, redirecting to login");
      }
    }
    return Promise.reject(error);
  }
);

export default httpRequest;
