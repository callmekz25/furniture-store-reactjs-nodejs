import { body } from "express-validator";
export const validateAddToCart = [
  body("productId").notEmpty().withMessage("Miss id").bail(),
  body("quantity")
    .notEmpty()
    .withMessage("Miss quantity")
    .bail()
    .isNumeric()
    .withMessage("Type no a number"),
  body("title").notEmpty().withMessage("Miss title").bail(),
  body("slug").notEmpty().withMessage("Miss slug").bail(),
  body("image").notEmpty().withMessage("Miss image").bail(),
  body("collections").notEmpty().withMessage("Miss collections").bail(),
];

export const validateUpdateItemInCart = [
  body("quantity")
    .notEmpty()
    .withMessage("Miss quantity")
    .bail()
    .isNumeric()
    .withMessage("Is not a number"),
  body("productId").notEmpty().withMessage("Miss id").bail(),
];
export const validateDeleteItemInCart = [
  body("productId").notEmpty().withMessage("Miss id").bail(),
];
