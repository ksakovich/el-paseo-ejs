const Cart = require('./cart');
const DbFetcher = require('../util/dbFetcher');
const dbFetcher = new DbFetcher();

module.exports = class Product
{
  constructor(id, title, imageUrl, description, price)
  {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save()
  {

  }

  static deleteById(id)
  {
  }

  static fetchAll()
  {
    return dbFetcher.getAllItems();
  }

  static findById(id, cb)
  {
  }
};
