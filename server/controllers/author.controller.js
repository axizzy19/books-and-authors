const authorModel = require('../models/author.model');

exports.getAuthors = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const authors = await authorModel.findAll(page, limit);
    res.json({
      success: true,
      data: authors,
      pagination: { page, limit }
    })
  } catch (error) {
    next(error);
  }
}

exports.getAuthorById = async (req, res, next) => {
  try {
    const author = await authorModel.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
}

exports.createAuthor = async (req, res, next) => {
  try {
    const { name, birth_date, rating } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newAuthor = await authorModel.create(req.body);
    res.status(201).json({ success: true, data: newAuthor });
  } catch (error) {
    next(error);
  }
}

exports.updateAuthor = async (req, res, next) => {
  try {
    const updatedAuthor = await authorModel.update(req.params.id, req.body);
    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json({ success: true, data: updatedAuthor });
  } catch (error) {
    next(error);
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const result = await authorModel.delete(req.params.id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json({ success: true, message: 'Author deleted successfully' });
  } catch (error) {
    next(error);
  }
}