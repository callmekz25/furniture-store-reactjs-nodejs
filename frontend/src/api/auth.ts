import httpRequest from "./config";
import IUser from "@/interfaces/user";

const handleSignUp = async (user: IUser) => {
  const res = await httpRequest.post("/signup", user);
  return res.data;
};
// Cho phép gửi cookie lên server
const handleSignIn = async (user: IUser) => {
  const res = await httpRequest.post("/signin", user, {
    withCredentials: true,
  });
  if (res.data) {
    const user = { userId: res.data.userId, name: res.data.name };
    localStorage.setItem("user", JSON.stringify(user));
  }
  return res.data;
};
const handleTest = async () => {
  const res = await httpRequest.get("/products", {
    withCredentials: true,
  });
  return res.data;
};
export { handleSignUp, handleSignIn, handleTest };
