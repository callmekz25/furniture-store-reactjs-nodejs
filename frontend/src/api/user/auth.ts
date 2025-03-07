import httpRequest from "../config";
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
      const user = { userId: data.userId, name: data.name };
      localStorage.setItem("account-basic-info", JSON.stringify(user));
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { handleSignUp, handleSignIn };
