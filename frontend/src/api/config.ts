import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:8000/v1",
  headers: { "Content-Type": "application/json" },
});
export default httpRequest;
