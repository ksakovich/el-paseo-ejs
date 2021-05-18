const Product = require("../models/product");
const Cart = require("../models/cart");
const DbFetcher = require("../util/dbFetcher");
const Group = require("../models/group");
const dbFetcher = new DbFetcher();

exports.getProducts = (req, res, next) => {
  // dbFetcher.getAllItems().then((result) =>
  // {

  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

Group.findAll()
  .then((groups) => {
    res.render("shop/product-list", {
      prods: groups,
      pageTitle: "All Products",
      path: "/products",
    });
  })
  .catch((err) => {
    console.log(err);
  });

exports.getFarmers = (req, res, next) => {
  res.render("shop/farmers", {
    prods: result,
    pageTitle: "Farmers",
    path: "/farmers",
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // // findByPk()
  dbFetcher
    .findItemById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      console.log(products);
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//   dbFetcher.getAllItems().then((result) =>
//   {
//     res.render('shop/index', {
//       prods: result,
//       pageTitle: 'Shop',
//       path: '/'
//     });
//   }).catch(err => console.log(err));
// };

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
