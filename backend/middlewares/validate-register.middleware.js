import { body } from "express-validator";

export const validateRegister = [
  body("email").isEmail().withMessage("Email không hợp lệ").bail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu tối thiểu 6 kí tự")
    .bail(),
];
