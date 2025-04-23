import asyncHandler from "../helpers/asyncHandler";

const getAccount = asyncHandler(async (req, res, next) => {
  const user = req.user;
  return res.status(200).json(user);
});
export { getAccount };
