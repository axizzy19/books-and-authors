const db = require('../config/database');

exports.findAll = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  try {
    return await db.any(`
        SELECT b.*, a.name as author_name
        FROM books b
        LEFT JOIN authors a ON b.author_id = a.author_id
        ORDER BY b.book_id LIMIT $1 OFFSET $2
      `, [limit, offset]);
  } catch (error) {
    throw new Error(`Error fetching books: ${error.message}`);
  }
};

exports.findById = async (id) => {
  try {
    return await db.one(`
          SELECT b.*, a.name as author_name 
          FROM books b 
          LEFT JOIN authors a ON b.author_id = a.author_id 
          WHERE b.book_id = $1
      `, id);
  } catch (error) {
    throw new Error(`Error finding book: ${error.message}`);
  }
};

exports.findByAuthorId = async (authorId) => {
  try {
    return await db.any(
      'SELECT FROM books WHERE author_id = $1 ORDER BY book_id',
      authorId
    );
  } catch (error) {
    throw new Error (`Error finding book by author: ${error.message}`);
  }
};

exports.create = async (bookData) => {
  const { title, publish_year, pages, author_id } = bookData;
  try {
    return await db.one(
      'INSERT INTO books (title, publish_year, pages, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, publish_year, pages, author_id]
    )
  } catch (error) {
    throw new Error(`Error creating book: ${error.message}`);
  }
};

exports.update = async (id, bookData) => {
  const { title, publish_year, pages, author_id } = bookData;
  try {
    return await db.one(
      'UPDATE books SET title = $1, publish_year = $2, pages = $3, author_id = $4 WHERE  book_id = $5 RETURNING *',
      [title, publish_year, pages, author_id, id]
    );
  } catch (error) {
    throw new Error(`Error updating book ${error.message}`);
  }
};

exports.delete = async (id) => {
  try {
    return await db.result('DELETE FROM books WHERE book_id = $1', id);
  } catch (error) {
    throw new Error(`Error deleting the book: ${error.message}`);
  }
}