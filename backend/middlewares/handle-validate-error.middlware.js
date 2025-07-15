import { validationResult } from "express-validator";
export const handleValidateErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Đã xảy ra lỗi",
      errors: errors.array(),
    });
  }
  next();
};
