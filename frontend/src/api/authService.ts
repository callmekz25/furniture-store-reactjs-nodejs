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
    if (data) {
      const user = { userId: data.userId, name: data.name, email: data.email };
      localStorage.setItem("account-basic-info", JSON.stringify(user));
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
const handleLogout = async () => {
  try {
    const { data } = await httpRequest.post("/logout");
    if (data) {
      localStorage.removeItem("account-basic-info");
    }
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
