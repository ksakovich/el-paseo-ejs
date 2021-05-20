const Sequelize = require('sequelize');

const sequelize = require('../util/sequelize');

const OrderItem = sequelize.define('order_item', {
    order_item_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = OrderItem;