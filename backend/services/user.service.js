import User from "../models/user.model.js";
class UserService {
  static getUsers = async () => {
    const users = await User.find().lean();
    return users;
  };
}
export default UserService;
