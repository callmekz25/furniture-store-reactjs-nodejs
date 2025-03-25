import httpRequest from "./config";
import IUser from "@/interfaces/user.interface";

// Catch lỗi bên redux thunk nên k cần catch lỗi ở đây
const registerAccount = async (user: IUser) => {
  const { data } = await httpRequest.post("/signup", user);
  return data;
};

const signIn = async (user: IUser) => {
  const { data } = await httpRequest.post("/signin", user);

  return data;
};
const logout = async () => {
  const { data } = await httpRequest.post("/logout");

  return data;
};

const getUser = async () => {
  const { data } = await httpRequest.get("/get-user");
  return data;
};
export { registerAccount, signIn, logout, getUser };
