const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

router.get('/books', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(1);
  res.render('books/index', {
    title: 'Books',
    heading: 'Books',
    book: book
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

router.post('/', (req, res) => {
  // const book = Book.create(req.body);
  console.log(req.body);
  res.redirect('/books')
});

router.get('/books/update', asyncHandler(async (req, res) => {
  const bookAttrs = await Book.rawAttributes
  res.render('update-book', {
    title: 'Update Book',
    heading: 'Update Book',
    buttonValue: 'Update Book',
    returnButton: false,
    bookAttrs
  });
}));

module.exports = router;
