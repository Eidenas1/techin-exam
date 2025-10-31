const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
} = require("../controllers/userController");
const restrictToAdmin = require("../middleware/restrictToAdmin");
const protect = require("../middleware/protect");
const authMiddleware = require("../middleware/authMiddleware");
const { validateSignup } = require("../validators/signup");

router
  .route("/users")
  .get(authMiddleware, protect, restrictToAdmin, getAllUsers)
  .post(authMiddleware, protect, restrictToAdmin, validateSignup, createUser);
router
  .route("/user/:id")
  .put(authMiddleware, protect, restrictToAdmin, validateSignup, updateUser)
  .delete(authMiddleware, protect, restrictToAdmin, deleteUser);
router.route("/users/search").get(authMiddleware, protect, restrictToAdmin, searchUsers);

module.exports = router;
