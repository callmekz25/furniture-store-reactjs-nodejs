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
    if (
      error.response.status === 401 &&
      error.response.data.mess === "Unauthorized"
    ) {
      window.location.href = "/signin";
    }
    // Refrsh token hết hạn hoặc sai
    if (
      error.response.status === 403 ||
      (error.response.status === 401 &&
        error.response.data.mess === "Unauthorization")
    ) {
      try {
        await httpRequest.post("/refresh-token");
        return httpRequest(error.config);
      } catch (err: any) {
        window.location.href = "/signin";
        console.log(err);
      }
    }
    return Promise.reject(error);
  }
);

export default httpRequest;
