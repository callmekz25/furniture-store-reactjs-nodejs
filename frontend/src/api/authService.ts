import httpRequest from "./config";
import IUser from "@/interfaces/user.interface";

const register = async (user: IUser) => {
  try {
    const { data } = await httpRequest.post("/signup", user);
    return data;
  } catch (error) {
    throw new Error(error?.response?.message);
  }
};

const login = async (user: IUser) => {
  try {
    const { data } = await httpRequest.post("/signin", user);

    return data;
  } catch (error) {
    throw new Error(error?.response?.message);
  }
};
const logout = async () => {
  try {
    const { data } = await httpRequest.post("/logout");
    return data;
  } catch (error) {
    throw new Error(error?.response?.message);
  }
};

const getUser = async () => {
  const { data } = await httpRequest.get("/get-user");

  return data;
};
export { register, login, logout, getUser };
