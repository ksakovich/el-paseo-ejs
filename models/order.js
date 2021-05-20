const Sequelize = require('sequelize');

const sequelize = require('../util/sequelize');

const Order = sequelize.define('order', {
    order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});
module.exports = Order;