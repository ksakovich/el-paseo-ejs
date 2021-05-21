const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Product = require("../models/product");
const Category = require("../models/category");
const User = require("../models/user");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");
const Order = require("../models/order");
const OrderItem = require("../models/order-item");
exports.associate = () => {
  Cart.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
  User.hasMany(Product);
  User.hasOne(Cart);
  Cart.belongsTo(User);

  Cart.belongsToMany(Product, { through: CartItem });
  Product.belongsToMany(Cart, { through: CartItem });

  Order.belongsTo(User);
  User.hasMany(Order);
  Order.belongsToMany(Product, { through: OrderItem });
  Product.belongsToMany(Order, { through: OrderItem });

  // Order.belongsTo(User,{constrains: true, onDelete: 'CASCADE'});
  // User.hasMany(Order);

  //TODO: product -> category

  //TODO: account ->user

  //TODO: product -> order

  //TODO: order -> user
};
