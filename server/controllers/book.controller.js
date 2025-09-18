const bookModel = require('../models/book.model');

exports.getBooks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const books = await bookModel.findAll(page, limit);
    res.json({
      success: true,
      data: books,
      pagination: { page, limit }
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({
      success: true,
      data: book
    })
  } catch (error) {
      next(error);
  }
};

exports.getBooksByAuthors = async (req, res, next) => {
  try {
    const books = await bookModel.findByAuthorId(req.params.authorId);
    res.json({ succes: true, data: books });
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, publish_year, pages, author_id } = req.body;

    if (!title || !author_id) {
      return res.status(400).json({ error: 'Title and author_id are required' });
    }

    const newBook = await bookModel.create(req.body);
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const updatedBook = await bookModel.update(req.params.id, req.body);
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book is not found' });
    }
    res.json({ success: true, data: updatedBook });
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const result = await bookModel.delete(req,params.id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Book is not found' });
    }
    res.json({ success: true, message: 'Book deleted successfully' });
  } catch {
    next(error);
  }
}