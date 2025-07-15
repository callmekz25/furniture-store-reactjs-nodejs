import { body, query } from "express-validator";

export const validateAddProduct = [
  body("title").notEmpty().withMessage("Miss title").bail(),
  body("slug").notEmpty().withMessage("Miss slug").bail(),
  body("brand").notEmpty().withMessage("Miss brand").bail(),
  body("collections").notEmpty().withMessage("Miss collections").bail(),
];
export const validateSearchProduct = [
  query("q").notEmpty().withMessage("Miss query"),
];
