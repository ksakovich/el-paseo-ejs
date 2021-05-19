const Product = require('../models/product');
const DbFetcher = require('../util/dbFetcher');
const dbFetcher = new DbFetcher();

exports.getAddProduct = (req, res, next) =>
{
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) =>
{
  const category_id = req.body.category_id;
  const title = req.body.title;
  const vendor_id = req.body.vendor_id;
  const short_description = req.body.short_description;
  const long_description = req.body.long_description;
  const small_image_url = req.body.small_image_url;
  const big_image_url = req.body.big_image_url;
  const price = req.body.price;
  const is_composite = req.body.is_composite;
  const unit = req.body.unit;
  const quantity_in_stock = req.body.quantity_in_stock;
  Product.create({
    category_id: category_id,
    title: title,
    vendor_id: vendor_id,
    short_description: short_description,
    long_description: long_description,
    small_image_url: small_image_url,
    big_image_url: big_image_url,
    price: price,
    is_composite: is_composite,
    unit: unit,
    quantity_in_stock: quantity_in_stock
  }).then(result =>
  {
    console.log("======== Product was added to DB ========");
  }).catch(err =>
  {
    console.log(err);
  });
  // const product = new Product(null, title, categoryId, vendorId, imageUrl, description, isComposite, unit, price);
  // dbFetcher.insertNewItem(product);
  // product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) =>
{
  const editMode = req.query.edit;
  if (!editMode)
  {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  // findByPk()
  Product.findByPk(prodId).then(product =>
  {
    if (!product)
    {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err =>
  {
    console.log(err);
  });
};

exports.postEditProduct = (req, res, next) =>
{
  const prodId = req.body.product_id;
  const updatedCategoryId = req.body.category_id;
  const updatedTitle = req.body.title;
  const updatedVendorId = req.body.vendor_id;
  const updatedShortDescription = req.body.short_description;
  const updatedLongDescription = req.body.long_description;
  const updatedSmallImageUrl = req.body.small_image_url;
  const updatedBigImageUrl = req.body.big_image_url;
  const updatedPrice = req.body.price;
  const updatedIsComposite = req.body.is_composite ? true : false;
  const updatedUnit = req.body.unit;
  const updatedQuantity = req.body.quantity_in_stock;

  Product.findByPk(prodId).then(product =>
  {
    product.product_id = prodId;
    product.category_id = updatedCategoryId;
    product.title = updatedTitle;
    product.vendor_id = updatedVendorId;
    product.short_description = updatedShortDescription;
    product.long_description = updatedLongDescription;
    product.small_imageUrl = updatedSmallImageUrl;
    product.big_image_url = updatedBigImageUrl;
    product.price = updatedPrice;
    product.is_composite = updatedIsComposite;
    product.unit = updatedUnit;
    product.quantity_in_stock = updatedQuantity;
    return product.save();
  }).then(result =>
  {
    console.log(`Updated product in DB: ${updatedTitle}`);
  }).catch(err =>
  {
    console.log(err);
  });

  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) =>
{
  Product.findAll().then(products =>
  {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err =>
  {
    console.log(err);
  })
};

exports.postDeleteProduct = (req, res, next) =>
{
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
