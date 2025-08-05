import { OkSuccess } from "../core/success.response.js";
import asyncHandler from "../helpers/asyncHandler.js";
import DashboardService from "../services/dashboard.service.js";
class DashboardController {
  static getSummary = asyncHandler(async (req, res, next) => {
    const data = await DashboardService.getSummary();
    return res.status(200).json(
      new OkSuccess({
        data: data,
      })
    );
  });
}
export default DashboardController;
