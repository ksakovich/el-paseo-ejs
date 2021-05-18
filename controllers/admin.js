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
  dbFetcher.findById(prodId, product =>
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
  });
};

exports.postEditProduct = (req, res, next) =>
{
  // const title = req.body.title;
  // const categoryId = req.body.category_id;
  // const vendorId = req.body.vendor_id;
  // const imageUrl = req.body.imageUrl;
  // const description = req.body.description;
  // const isComposite = req.body.is_composite;
  // const unit = req.body.unit;
  // const price = req.body.price;
  // const product = new Product(
  //   null, 
  //   title, 
  //   categoryId, 
  //   vendorId, 
  //   imageUrl,
  //   description, 
  //   isComposite, 
  //   unit, 
  //   price);
  // dbFetcher.insertNewItem(product);


  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedCategoryId = req.body.category_id;
  const updatedVendorId = req.body.vendor_id;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedIsComposite = req.body.is_composite;
  const updatedUnit = req.body.unit;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedCategoryId,
    updatedVendorId,
    updatedImageUrl,
    updatedDesc,
    updatedIsComposite,
    updatedUnit,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) =>
{
  Product.fetchAll(products =>
  {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct = (req, res, next) =>
{
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
