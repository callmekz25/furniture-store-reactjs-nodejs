import { body, query } from "express-validator";

export const validateAddProduct = [
  body("title").notEmpty().withMessage("Miss title").bail(),
  body("slug").notEmpty().withMessage("Miss slug").bail(),
  body("brand").notEmpty().withMessage("Miss brand").bail(),
  body("collections")
    .custom((value) => {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) && parsed.length > 0;
      } catch (err) {
        return false;
      }
    })
    .withMessage("Miss collections"),
];
export const validateSearchProduct = [
  query("q").notEmpty().withMessage("Miss query"),
];
