const express = require("express");
const router = express.Router();

const {
  createBook,
  deleteBook,
  updateBook,
  getAllBooks,
  searchBooks,
  reserveBook
} = require("../controllers/booksController");
const {createReview, getReviews} = require("../controllers/reviewController");
const { validateNewBook } = require("../validators/newBook");
const { validateUpdatedBook } = require("../validators/updateBook");
const restrictToAdmin = require("../middleware/restrictToAdmin");
const protect = require("../middleware/protect");
const authMiddleware = require("../middleware/authMiddleware");


router
  .route("/")
  .get(getAllBooks)
  .post(authMiddleware, protect, restrictToAdmin, validateNewBook, createBook);

  router
  .route("/:id")
  .delete(deleteBook)
  .put(
    authMiddleware,
    protect,
    restrictToAdmin,
    validateUpdatedBook,
    updateBook
  );

router.route("/:id/reviews")
  .post(protect, createReview)
  .get(getReviews);
router.route("/search").get(searchBooks);

router.post("/reserve", reserveBook);
module.exports = router;
