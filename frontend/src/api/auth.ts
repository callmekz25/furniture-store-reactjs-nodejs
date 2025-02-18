import api from "./config";
import IUser from "@/interfaces/user";

const handleSignUp = async (user: IUser) => {
  const res = await api.post("/signup", user);
  return res.data;
};
// Cho phép gửi cookie lên server
const handleSignIn = async (user: IUser) => {
  const res = await api.post("/signin", user, { withCredentials: true });
  if (res) {
    localStorage.setItem("accessToken", res.data.accessToken);
  }
  return res.data;
};
const handleTest = async () => {
  const res = await api.get("/products", {
    withCredentials: true,
  });
  return res.data;
};
export { handleSignUp, handleSignIn, handleTest };
