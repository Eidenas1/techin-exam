const {
  createBook,
  deleteBook,
  updateBook,
  getAllBooksM,
  searchAndFilterBooks,
  reserveBook: reserveBookModel
} = require("../models/booksModel");
exports.reserveBook = async (req, res, next) => {
  try {
    const { book_id, reserved_date } = req.body;
    const user_id = req.user?.id || req.body.user_id;
    if (!book_id || !reserved_date || !user_id) {
      return res.status(400).json({ status: "fail", message: "Missing book_id, reserved_date, or user_id" });
    }
    const reservation = await reserveBookModel({ book_id, user_id, reserved_date });
    res.status(201).json({ status: "success", data: reservation });
  } catch (error) {
    next(error);
  }
};
const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");

exports.getAllBooks = async (req, res, next) => {
  try {
    const booksList = await getAllBooksM();
    res.status(200).json({
      status: "success",
      books: booksList,
    });
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newBook = req.body;

    const createdBook = await createBook(newBook);

    res.status(201).json({
      status: "success",
      data: createdBook,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await deleteBook(id);

    if (!book) {
      throw new AppError("book not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      throw new AppError("Please provide at least one field to update", 400);
    }

     await updateBook(id, updates);

    if (!updatedBook) {
      throw new AppError("Invalid id, book not found and not updated", 404);
    }

    res.status(200).json({
      status: "success",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

exports.searchBooks = async (req, res, next) => {
  try {
    const { title, category_id, sortBy, order, page, limit } = req.query;

    const s = await searchAndFilterBooks({
      title,
      category_id: category_id ? parseInt(category_id, 10) : undefined,
      sortBy,
      order,
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    });

    res.status(200).json({
      status: "success",
      results: Array.isArray(s) ? s.length : 0,
      data: Array.isArray(s) ? books : [],
    });
  } catch (error) {
    console.error("Error in searchBooks:", error.message);
    next(error);
  }
};
