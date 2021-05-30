const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = require("../util/sequelize");

const Farmer = sequelize.define("farmer", {
  farmer_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  farmer_title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  image_url: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  social_first: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  social_second: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Farmer;
