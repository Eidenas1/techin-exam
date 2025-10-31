
const reviewModel = require("../models/reviewModel");

exports.getReviews = async (req, res) => {
  const book_id = req.params.id;
  try {
    const reviews = await reviewModel.getReviewsByBookId(book_id);
    res.json(reviews);
  } catch (err) {
    console.error('Error in getReviews:', err);
    res.status(500).json({ message: "Error fetching reviews", error: err.message });
  }
};

exports.createReview = async (req, res) => {
  const book_id = req.params.id;
  const user_id = req.user.id;
  const { review } = req.body;

  if (!review) return res.status(400).json({ message: "Review text required" });

  try {
    await reviewModel.createReview({ book_id, user_id, review });
    res.status(201).json({ message: "Review submitted!" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting review" });
  }
};

exports.getReviewCount = async (req, res) => {
  const book_id = req.params.id;
  try {
    const count = await reviewModel.getTotalReviewCount(book_id);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error fetching review count" });
  }
};