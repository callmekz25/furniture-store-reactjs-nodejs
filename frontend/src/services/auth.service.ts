import httpRequest from "../config/axios.config";
import IUser from "@/interfaces/user.interface";

const register = async (user: IUser) => {
  const { data } = await httpRequest.post("/signup", user);
  return data;
};

const login = async (user: IUser) => {
  const { data } = await httpRequest.post("/signin", user, {
    skipAuthRefresh: true,
  });
  return data;
};
const logout = async () => {
  const { data } = await httpRequest.post("/logout");
  return data;
};

export { register, login, logout };
