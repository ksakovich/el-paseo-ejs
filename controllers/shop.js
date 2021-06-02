const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");
const DbFetcher = require("../util/dbFetcher");
const Category = require("../models/category");
const Farmer = require("../models/farmer");
const Order = require("../models/order");
const dbFetcher = new DbFetcher();

exports.getProducts = (req, res, next) =>
{
  // dbFetcher.getAllItems().then((result) =>
  // {
  let categories = [];
  Category.findAll()
    .then((extractedCategories) =>
    {
      categories = [...extractedCategories];
      console.log("categories: ", categories);
    })
    .then(() =>
    {
      Product.findAll()
        .then((products) =>
        {
          res.render("shop/product-list", {
            prods: products,
            categories: categories,
            pageTitle: "All Products",
            path: "/products",
            isAuthenticated: req.session.isLoggedIn,
            username: req.user?.user_name ?? 'Guest',
            isAdmin: req.user?.is_admin ?? false
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.getCategories = (req, res, next) =>
{
  Category.findAll()
    .then((extractedCategories) =>
    {
      categories = [...extractedCategories];
      res.render("shop/product-list", {
        categories: categories,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
        username: req.user?.user_name ?? 'Guest',
        isAdmin: req.user?.is_admin ?? false
      });
    })
    .catch((err) => console.log(err));
};

exports.getFarmers = (req, res, next) =>
{
  Farmer.findAll()
    .then((extractedFarmers) =>
    {
      farmers = [...extractedFarmers];
      res.render("shop/farmer-list", {
        farmers: farmers,
        pageTitle: "Farmers",
        path: "/farmers",
        isAuthenticated: req.session.isLoggedIn,
        username: req.user?.user_name ?? 'Guest',
        isAdmin: req.user?.is_admin ?? false
      });
    })
    .catch((err) =>
    {
      console.log(err);
    });
};

exports.getSingleCategory = (req, res, next) =>
{
  const categId = req.params.categoryId;
  Category.findByPk(categId, (category) =>
  {
    // console.log(category);
  });
  // console.log(categId);
  res.redirect("/");
};

exports.getSingleFarmer = (req, res, next) =>
{
  const farmId = req.params.farmerId;
  Farmer.findByPk(farmId, (farmer) =>
  {
    // console.log(farmer);
  });
  console.log(farmId);
  res.redirect("/farmers");
};

exports.getSingleProduct = (req, res, next) =>
{
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((singleProduct) =>
    {
      res.render("shop/product-detail", {
        product: singleProduct.dataValues,
        pageTitle: singleProduct.title,
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
        username: req.user?.user_name ?? 'Guest',
        isAdmin: req.user?.is_admin ?? false
      });
    })
    .catch((err) =>
    {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) =>
{
  Product.findAll()
    .then((products) =>
    {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: req.session.isLoggedIn,
        username: req.user?.user_name ?? 'Guest',
        isAdmin: req.user?.is_admin ?? false
      });
    })
    .catch((err) =>
    {
      console.log(err);
    });
};

exports.getCart = (req, res, next) =>
{
  req.user
    .getCart()
    .then((cart) =>
    {
      return cart
        .getProducts()
        .then((cartProducts) =>
        {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: cartProducts,
            isAuthenticated: req.session.isLoggedIn,
            username: req.user?.user_name ?? 'Guest',
            isAdmin: req.user?.is_admin ?? false
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) =>
{
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) =>
    {
      fetchedCart = cart;
      return cart.getProducts({ where: { product_id: prodId } });
    })
    .then((products) =>
    {
      let product;
      if (products.length > 0)
      {
        product = products[0];
      }

      if (product)
      {
        const oldQuantity = product.cart_item.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) =>
    {
      return fetchedCart.addProduct(product, {
        logging: console.log,
        through: { quantity: newQuantity },
      });
    })
    .then(() =>
    {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) =>
{
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) =>
    {
      return cart.getProducts({ where: { product_id: prodId } });
    })
    .then((products) =>
    {
      const product = products[0];
      return product.cart_item.destroy();
    })
    .then((result) =>
    {
      console.log(
        `============ Deleted from cart a product with ID: ${prodId} ==========`
      );
      res.redirect("/cart");
    })
    .catch((err) =>
    {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) =>
{
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) =>
    {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
        username: req.user?.user_name ?? 'Guest',
        isAdmin: req.user?.is_admin ?? false
      });
    })
    .catch((err) =>
    {
      console.log(err);
    });
};
exports.postOrder = (req, res, next) =>
{
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) =>
    {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) =>
    {
      return req.user
        .createOrder()
        .then((order) =>
        {
          return order.addProducts(
            products.map((product) =>
            {
              product.order_item = { quantity: product.cart_item.quantity };
              return product;
            })
          );
        })
        .catch((err) =>
        {
          console.log(err);
        });
    })
    .then((result) =>
    {
      return fetchedCart.setProducts(null);
    })
    .then((result) =>
    {
      res.redirect("/orders");
    })
    .catch((err) =>
    {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) =>
{
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    isAuthenticated: req.session.isLoggedIn,
    username: req.user?.user_name ?? 'Guest',
    isAdmin: req.user?.is_admin ?? false
  });
};
