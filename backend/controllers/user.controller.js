import asyncHandler from "../helpers/asyncHandler.js";
import { OkSuccess } from "../core/success.response.js";
import UserService from "../services/user.service.js";
class UserController {
  static getUsers = asyncHandler(async (req, res, next) => {
    const users = await UserService.getUsers();
    return res.status(200).json(
      new OkSuccess({
        message: "Get users",
        data: users,
      })
    );
  });
}
export default UserController;
