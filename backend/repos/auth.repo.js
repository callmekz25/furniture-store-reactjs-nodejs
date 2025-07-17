import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email: email }).lean();
  return user;
};
