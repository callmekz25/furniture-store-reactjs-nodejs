import { body, param } from "express-validator";
export const validatePlaceOrder = [
  body("products")
    .notEmpty()
    .withMessage("Miss products")
    .bail()
    .isArray({ min: 1 })
    .withMessage("Must have 1 or more product"),
  body("totalPrice")
    .notEmpty()
    .withMessage("Miss total price")
    .bail()
    .isNumeric()
    .withMessage("Must a number"),
  body("totalItems")
    .notEmpty()
    .withMessage("Miss total items")
    .bail()
    .isNumeric()
    .withMessage("Must a number"),
];

export const validateConfirmedOrder = [
  param("id")
    .notEmpty()
    .withMessage("Miss order id")
    .bail()
    .custom((value) => {
      if (value === "undefined" || value === "null") {
        return Promise.reject("Invalid order id");
      }
      return true;
    }),
  body("name").notEmpty().withMessage("Miss user name").bail(),
  body("email")
    .notEmpty()
    .withMessage("Miss email")
    .bail()
    .isEmail()
    .withMessage("Not valid email"),
  body("phoneNumber").notEmpty().withMessage("Miss phone number").bail(),
  body("address").notEmpty().withMessage("Miss address").bail(),
  body("province").notEmpty().withMessage("Miss province").bail(),
  body("district").notEmpty().withMessage("Miss district").bail(),
  body("ward").notEmpty().withMessage("Miss ward").bail(),
];
