const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"'
        },
        notEmpty: {
          msg: 'Please provide a value for "title"'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: {
          msg: 'Please provide a value for "author"'
        },
        notEmpty: {
          msg: 'Please provide a value for "author"'
        }
      }
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: {
          msg: 'Please provide a value for "genre"'
        },
        notEmpty: {
          msg: 'Please provide a value for "genre"'
        }
      }
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        len: {
          args: 4,
        },
        notNull: {
          msg: 'Please provide a value for "year"'
        },
      }
    }
  }, { sequelize });

  return Book;
};