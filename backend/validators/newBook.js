const { body } = require("express-validator");

const validateNewBook = [
  body().notEmpty().withMessage("Request body must contain data"),

  body("title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters")
    .notEmpty()
    .withMessage("Name is required"),

  body("description")
    .isString()
    .withMessage("Description must be a string")
    .notEmpty()
    .withMessage("Description is required"),

  body("cover_url")
    .isLength({ min: 3, max: 1000 })
    .withMessage("cover_url must not be longer than 1000 characters"),

  body("author")
    .isString()
    .withMessage("author must be a string")
    .notEmpty()
    .withMessage("author is required"),
    
  body("isbn")
    .isInt({ min: 1 })
    .withMessage("isbn must be a positive integer")
    .toFloat(),
];

module.exports = { validateNewBook };
