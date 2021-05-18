const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = require("../util/sequelize");
// cosnt sequelize

// https://sequelize.org/v5/manual/data-types.html
const Group = sequelize.define("group", {
  category_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  is_composite: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Group;
