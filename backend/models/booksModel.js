const { sql } = require("../utils/postgres");
const db = require("../db");

exports.createBook = async (book) => {
  const createdBook = await sql`
    INSERT INTO books (
      title,
      author,
      isbn,
      published_date,
      cover_url,
      description,
      language
    )
    VALUES (
      ${book.title},
      ${book.author},
      ${book.isbn},
      ${book.published_date},
      ${book.cover_url},
      ${book.description},
      ${book.language}
    )
    RETURNING *;
  `;
  return createdBook[0];
};

exports.getAllBooksM = async () => {
  const booksList = await sql`
    SELECT 
      book_id, 
      title, 
      author, 
      isbn, 
      published_date::text AS published_date, 
      language, 
      cover_url, 
      created_at,
      description
    FROM books
  `;
  return booksList;
};

exports.deleteBook = async (id) => {
  const book = await sql`
   DELETE FROM books
   WHERE books.book_id = ${id}
   returning *
    `;
  return book;
};

exports.updateBook = async (id, updatedBook) => {
  const book = await sql`
    update books set ${sql(
      updatedBook,
      "title",
      "author",
      "isbn",
      "published_date",
      "language",
      "cover_url",
      "description"
    )}
    where id = ${id}
    returning *;
  `;
  return book[0];
};
exports.reserveBook = async ({ book_id, user_id, reserved_date }) => {
  const reservation = await sql`
    INSERT INTO reservations (book_id, user_id, reserved_date)
    VALUES (${book_id}, ${user_id}, ${reserved_date})
    RETURNING *;
  `;
  return reservation[0];
};