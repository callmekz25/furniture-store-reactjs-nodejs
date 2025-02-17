import api from "./config";
import IUser from "@/interfaces/user";

const handleSignUp = async (user: IUser) => {
  const res = await api.post("/signup", user);
  return res.data;
};
// Xử lý 
const handleSignIn = async (user: IUser) => {
  const res = await api.post("/signin", user);
  if (res) {
    localStorage.setItem("accessToken", res.data.accessToken);
  }
  return res.data;
};
const handleTest = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await api.get("/products", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
export { handleSignUp, handleSignIn, handleTest };
