const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../util/sequelize');

const Farmer = sequelize.define('farmer', {
    farmer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    farmer_title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    image_url: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Farmer;