const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../util/sequelize');
// cosnt sequelize
const Product = sequelize.define('product', {
  product_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  vendor_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  short_description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  long_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  small_image_url: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  big_image_url: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  is_composite: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  unit: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity_in_stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
module.exports = Product;

// const Cart = require('./cart');
// const DbFetcher = require('../util/dbFetcher');
// const dbFetcher = new DbFetcher();

// module.exports = class Product
// {
//   constructor(id, title, category_id, vendor_id, imageUrl, description, is_composite, unit, price)
//   {
//     this.id = id;
//     this.category_id = category_id;
//     this.title = title;
//     this.vendor_id = vendor_id;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.is_composite = is_composite;
//     this.unit = unit;
//     this.price = price;
//   }

//   save()
//   {

//   }

//   static deleteById(id)
//   {
//   }

//   static fetchAll()
//   {
//     return dbFetcher.getAllItems();
//   }

//   static findById(id, cb)
//   {
//   }
// };
