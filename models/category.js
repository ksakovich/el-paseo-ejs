const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../util/sequelize');
// cosnt sequelize

// https://sequelize.org/v5/manual/data-types.html
const Category = sequelize.define('category', {});

module.exports = Category;