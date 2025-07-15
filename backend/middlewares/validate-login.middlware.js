import { body } from "express-validator";

export const validateLogin = [
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password").notEmpty().withMessage("Mật khẩu không được trống"),
];
