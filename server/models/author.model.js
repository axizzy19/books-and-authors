const db = require('../config/database');

exports.findAll = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  try {
    return await db.any(
      'SELECT * FROM authors ORDER BY author_id LIMIT $1 OFFSET $2',
      [limit, offset]
    );
  } catch (error) {
    throw new Error(`Error fetching authors ${error.message}`);
  }
};

exports.findById = async (id) => {
  try {
    return await db.any('SELECT * FROM authors WHERE author_id = $1', id);
  } catch (error) {
    throw new Error(`Error finding authors: ${error.message}`);
  }
};

exports.create = async (authorData) => {
  const { name, birth_date, rating } = authorData;
  try {
    return await db.one(
      'INSERT INTO authors (name, birth_date, rating) VALUES ($1, $2, $3) RETURNING *',
      [name, birth_date, rating]
    );
  } catch (error) {
    throw new Error(`Error creating author: ${error.message}`)
  }
};

exports.update = async (id, authData) => {
  const { name, birth_date, rating } = authorData;
  try {
    return await db.one(
      'UPDATE authors SET name = $1, birth_date = $2, rating = $3 WHERE author.id = $4 RETURNING *',
      [name, birth_date, rating, id]
    );
  } catch (error) {
    throw new Error(`Error updating author: ${error.message}`);
  }
};

exports.delete = async (id) => {
  try {
    return await db.result('DELETE FROM authors WHERE author_id = $1', id);
  } catch (error) {
    throw new Error(`Error deleting author: ${error.message}`);
  }
};