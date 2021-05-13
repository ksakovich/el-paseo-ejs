const Cart = require('./cart');
const DbFetcher = require('../util/dbFetcher');
const dbFetcher = new DbFetcher();

module.exports = class Product
{
  constructor(id, title, category_id, vendor_id, imageUrl, description, is_composite, unit, price)
  {
    this.id = id;
    this.category_id = category_id;
    this.title = title;
    this.vendor_id = vendor_id;
    this.imageUrl = imageUrl;
    this.description = description;
    this.is_composite = is_composite;
    this.unit = unit;
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
