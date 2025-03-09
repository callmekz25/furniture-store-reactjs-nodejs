import httpRequest from "./config";
import IUser from "@/interfaces/user.interface";

const handleSignUp = async (user: IUser) => {
  try {
    await httpRequest.post("/signup", user);
  } catch (error) {
    console.log(error);
  }
};

const handleSignIn = async (user: IUser) => {
  try {
    const { data } = await httpRequest.post("/signin", user);

    return data;
  } catch (error) {
    console.log(error);
  }
};
const handleLogout = async () => {
  try {
    const { data } = await httpRequest.post("/logout");

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  try {
    const { data } = await httpRequest.get("/get-user");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { handleSignUp, handleSignIn, handleLogout, getUser };
