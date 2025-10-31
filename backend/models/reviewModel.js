const { sql } = require('../utils/postgres');

exports.getReviewsByBookId = async (book_id) => {
  return await sql`
    SELECT reviews.*, users.email
    FROM reviews
    JOIN users ON reviews.user_id = users.id
    WHERE reviews.book_id = ${book_id}
    ORDER BY reviews.created_at DESC;
  `;
};

exports.getReviewById = async (id) => {
  return await sql`
    SELECT reviews.*, users.emai
    FROM reviews
    JOIN users ON reviews.user_id = users.id
    WHERE reviews.id = ${id};
  `;
};

exports.createReview = async ({ book_id, user_id, review }) => {
  return await sql`
    INSERT INTO reviews (book_id, user_id, review)
    VALUES (${book_id}, ${user_id}, ${review})
    RETURNING *;
  `;
};

exports.getTotalReviewCount = async (book_id) => {
  const result = await sql`
    SELECT COUNT(*)::int AS count
    FROM reviews
    WHERE book_id = ${book_id};
  `;
  return result[0].count;
};
