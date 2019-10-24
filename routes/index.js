const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      res.status(500).send(error);
    }
  }
}

function appendPageLinks(arr, itemsPerPage) {
  const totalPage = Math.ceil(arr.length / itemsPerPage);
  return totalPage
}

router.get('/', (req, res) => {
  res.redirect('books');
});

router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [[ "Title", "ASC"]] });
  console.log(books.length);
  res.render('index', {
    title: 'Books',
    heading: 'Books',
    totalPage: appendPageLinks(books, 10),
    books
  });
}));

router.get('/books/new', asyncHandler(async (req, res) => {
  const bookAttrs = await Book.rawAttributes
  res.render('new-book', {
    title: 'New Book',
    heading: 'New Book',
    buttonValue: 'Create New Book',
    returnButton: true,
    bookAttrs
  });
}));

// Post new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect('/books');
}));

router.get('/books/:id', asyncHandler(async (req, res) => {
  const bookAttrs = await Book.rawAttributes
  const book = await Book.findByPk(req.params.id);
  res.render('update-book', {
    title: 'Update Book',
    heading: 'Update Book',
    buttonValue: 'Update Book',
    returnButton: false,
    value: true,
    bookAttrs,
    book
  });
}));

// Update book in the database
router.post('/books/:id', asyncHandler(async (req, res) => {
  await console.log(req.body)
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/books');
}));

// Delete book in the database
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}));

module.exports = router;
