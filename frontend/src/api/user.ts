import api from "./config";
import IUser from "@/interfaces/user";

const handleSignUp = async (user: IUser) => {
  const res = await api.post("/signup", user);
  return res.data;
};
const handleSignIn = async (user: IUser) => {
  const res = await api.post("/signin", user);
  return res.data;
};
export { handleSignUp, handleSignIn };
