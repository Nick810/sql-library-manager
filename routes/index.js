const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
  return totalPage;
}

router.get('/', (req, res) => {
  res.redirect('books/page/1');
});

//
router.get('/books/page/:id', asyncHandler(async (req, res) => {
  const booksList = await Book.findAll();
  const books = await Book.findAll({ offset: (req.params.id - 1) * 10,
                                      limit: 10,
                                      order: [[ "Title", "ASC" ]]});
  res.render('index', {
    title: 'Books',
    heading: 'Books',
    totalPage: appendPageLinks(booksList, 10),
    books
  });
}));

//
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

router.get('/books/search/', asyncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  // console.log(searchQuery)
  const books = await Book.findAll({
                        where: {
                          title: {
                            [Op.startsWith]: searchQuery
                          },
                          // author: {
                          //   [Op.like]: searchQuery
                          // },
                          // genre: {
                          //   [Op.like]: searchQuery
                          // },
                          // year: {
                          //   [Op.like]: searchQuery
                          // },
                        }
                      })
  console.log(books)
  res.render('search', {
    title: 'Search',
    heading: 'Search',

    books
  });
}));

// Post new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect('/books/page/1');
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
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/books/page/1');
}));

// Delete book in the database
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books/page/1');
}));

module.exports = router;
