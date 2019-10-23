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

router.get('/', (req, res) => {
  res.redirect('books');
});

router.post('/', (req, res) => {
  console.log(req.body);
  // res.redirect('/books')
});

router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [[ "Title", "ASC"]] });
  res.render('index', {
    title: 'Books',
    heading: 'Books',
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

router.get('/books/:id', asyncHandler(async (req, res) => {
  const bookAttrs = await Book.rawAttributes
  const book = await Book.findByPk(req.params.id);
  res.render('update-book', {
    title: 'Update Book',
    heading: 'Update Book',
    buttonValue: 'Update Book',
    returnButton: false,
    bookAttrs,
    book
  });
}));




module.exports = router;
