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

// Main page
router.get('/books/page/:id', asyncHandler(async (req, res, next) => {
  const booksList = await Book.findAll();
  const totalPage = appendPageLinks(booksList, 10);
  const books = await Book.findAll({ offset: (req.params.id - 1) * 10,
                                     limit: 10,
                                     order: [[ "Title", "ASC" ]]
                                  });

  if (parseInt(req.params.id) > totalPage) {
    const err = new Error;
    err.status = 404;
    err.message = 'Sorry! We couldn\'t find the page you were looking for';
    next(err);
    console.error('Error: Sorry! We couldn\'t find the page you were looking for');
  } else {
    res.render('index', {
      title: 'Books',
      heading: 'Books',
      totalPage: totalPage,
      books
    });
  }
}));

// Add new books to the database
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

// Search for books in the database
router.get('/books/find/page/:id', asyncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  let allBooks;
  let books;

  if (/\d+/.test(searchQuery) === true) {
    allBooks = await Book.findAll({ where: { year: { [Op.substring]: searchQuery } } });
    books = await Book.findAll({
                    offset: (req.params.id - 1) * 10,
                    limit: 10,
                    order: [[ "Title", "ASC" ]],
                    where: {
                      year: {
                        [Op.substring]: searchQuery
                      }
                    }
                  });
  } else {
    allBooks = await Book.findAll({ where: { [Op.or]: [
                        {
                          title: {
                            [Op.substring]: searchQuery
                          }
                        },
                        {
                          author: {
                            [Op.substring]: searchQuery
                          }
                        },
                        {
                          genre: {
                            [Op.substring]: searchQuery
                          }
                        },
                      ]
                    }
                  });
    books = await Book.findAll({
                    offset: (req.params.id - 1) * 10,
                    limit: 10,
                    order: [[ "Title", "ASC" ]],
                    where: {
                      [Op.or]: [
                        {
                          title: {
                            [Op.substring]: searchQuery
                          }
                        },
                        {
                          author: {
                            [Op.substring]: searchQuery
                          }
                        },
                        {
                          genre: {
                            [Op.substring]: searchQuery
                          }
                        },
                      ]
                    }
                  });
  }

  res.render('search', {
    title: 'Search',
    heading: 'Search',
    totalPage: appendPageLinks(allBooks, 10),
    searchQuery,
    books
  });
}));

// Post new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  const bookAttrs = await Book.rawAttributes
  let book;

  try {
    book = await Book.create(req.body);
    res.redirect('/books/page/1');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessage = [];
      error.errors.forEach(error => errorMessage.push(error.message));

      res.render('new-book', {
        title: 'Error Adding New Book',
        heading: 'New Book',
        buttonValue: 'Create New Book',
        returnButton: true,
        errorMessage,
        bookAttrs
      });
    } else {
      throw error;
    }
  }
}));

// Open book by parameters id
router.get('/books/:id', asyncHandler(async (req, res) => {
  const bookAttrs = await Book.rawAttributes;
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
  const bookAttrs = await Book.rawAttributes;
  const book = await Book.findByPk(req.params.id);

  try {
    await book.update(req.body);
    res.redirect('/books/page/1');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessage = [];
      error.errors.forEach(error => errorMessage.push(error.message));

      res.render('update-book', {
        title: 'Update Book',
        heading: 'Update Book',
        buttonValue: 'Update Book',
        returnButton: false,
        value: true,
        errorMessage,
        bookAttrs,
        book
      });
    } else {
      throw error;
    }
  }
}));

// Delete book in the database
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books/page/1');
}));

module.exports = router;
