import asyncHandler from "../helpers/asyncHandler.js";
import AccountService from "../services/account.service.js";
import { OkSuccess } from "../core/success.response.js";
class AccountController {
  static getUser = asyncHandler(async (req, res, next) => {
    const user = await AccountService.getUser(req.user?._id);
    return res
      .status(200)
      .json(new OkSuccess({ message: "Get user info successful", data: user }));
  });
  static addAddress = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    await AccountService.addAddress(req.body, userId);
    return res.status(200).json(
      new OkSuccess({
        message: "Add address successful!",
      })
    );
  });
  static updateAddress = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    await AccountService.updateAddress(req.body, userId);
    return res.status(200).json(
      new OkSuccess({
        message: "Update address successful!",
      })
    );
  });
}
export default AccountController;
