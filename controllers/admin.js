const Product = require("../models/product");
const Order = require("../models/order");
const Category = require("../models/category");
const Farmer = require("../models/farmer");
// const DbFetcher = require('../util/dbFetcher');
// const dbFetcher = new DbFetcher();

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
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
  // EXMPLE: req.user.createProduct();
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
    quantity_in_stock: quantity_in_stock,
  })
    .then((result) => {
      console.log("======== Product was added to DB ========");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  // findByPk()
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
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

  Product.findByPk(prodId)
    .then((product) => {
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
    })
    .then((result) => {
      console.log(`Updated product in DB: ${updatedTitle}`);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.product_id;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy().then((result) => {
        console.log(`Deleting from DB product with ID: ${prodId}`);
        res.redirect("/admin/products");
        // res.redirect('/');
      });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("================ Done deleting ===============");
};

//******************CATEGORIES******************

exports.getAddCategory = (req, res, next) => {
  res.render("admin/edit-category", {
    pageTitle: "Add Category",
    path: "/admin/add-category",
    editing: false,
  });
};

exports.postAddCategory = (req, res, next) => {
  const category_name = req.body.category_name;

  Category.create({
    category_name: category_name,
  })
    .then((result) => {
      console.log("======== Category was added to DB ========");
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditCategory = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const CategId = req.params.categoryId;
  Category.findByPk(CategId)
    .then((category) => {
      if (!category) {
        return res.redirect("/");
      }
      res.render("admin/edit-category", {
        pageTitle: "Edit Category",
        path: "/admin/edit-category",
        editing: editMode,
        category: category,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//POST EDIT CATEGORY
exports.postEditCategory = (req, res, next) => {
  const CategId = req.body.category_id;
  const UpdatedCategoryName = req.body.category_name;

  Category.findByPk(CategId)
    .then((category) => {
      category.category_id = CategId;
      category.category_name = UpdatedCategoryName;
      return category.save();
    })
    .then((result) => {
      console.log("Updated category in DB: ${UpdatedCategoryName}");
      res.redirect("/admin/categories");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCategories = (req, res, next) => {
  Category.findAll()
    .then((extractedCategories) => {
      categories = [...extractedCategories];
      res.render("admin/categories", {
        categories: categories,
        pageTitle: "Admin Categories",
        path: "/admin/categories",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteCategory = (req, res, next) => {
  const categId = req.body.category_id;
  Category.findByPk(categId)
    .then((category) => {
      return category.destroy().then((result) => {
        console.log(`Deleting categorie from DB with ID: ${categId}`);
        res.redirect("categories");
      });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("============Done Deleting =============");
};

//******************FARMERS******************
exports.getAddFarmer = (req, res, next) => {
  res.render("admin/edit-farmer", {
    pageTitle: "Add Farmer",
    path: "/admin/add-farmer",
    editing: false,
  });
};

exports.postAddFarmer = (req, res, next) => {
  const farmer_id = req.body.farmer_id;
  const farmer_title = req.body.farmer_title;
  const description = req.body.description;
  const image_url = req.body.image_url;
  const social_first = req.body.social_first;
  const social_second = req.body.social_second;

  Farmer.create({
    farmer_id: farmer_id,
    farmer_title: farmer_title,
    description: description,
    image_url: image_url,
    social_first: social_first,
    social_second: social_second,
  })
    .then((result) => {
      console.log("======== Farmer was added to DB ========");
      res.redirect("/farmers");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditFarmer = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const farmId = req.params.farmerId;
  Farmer.findByPk(farmId)
    .then((farmer) => {
      if (!farmer) {
        return res.redirect("/");
      }
      res.render("admin/edit-farmer", {
        pageTitle: "Edit Farmer",
        path: "/admin/edit-farmer",
        editing: editMode,
        farmer: farmer,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditFarmer = (req, res, next) => {
  const farmId = req.body.farmer_id;
  const updatedFarmerTitle = req.body.farmer_title;
  const updatedDescription = req.body.description;
  const updatedImageUrl = req.body.image_url;
  const updatedSocialFirst = req.body.social_first;
  const updatedSocialSecond = req.body.social_second;

  Farmer.findByPk(farmId)
    .then((farmer) => {
      farmer.farmer_id = farmId;
      farmer.farmer_title = updatedFarmerTitle;
      farmer.description = updatedDescription;
      farmer.image_url = updatedImageUrl;
      farmer.social_first = updatedSocialFirst;
      farmer.social_second = updatedSocialSecond;
      return farmer.save();
    })
    .then((result) => {
      console.log(`Updated farmer in DB: ${updatedFarmerTitle}`);
      res.redirect("/admin/farmers");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFarmers = (req, res, next) => {
  Farmer.findAll()
    .then((result) => {
      res.render("admin/farmers", {
        farmers: result,
        pageTitle: "Admin Farmers",
        path: "/admin/farmers",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteFarmer = (req, res, next) => {
  const farmId = req.body.farmer_id;
  Farmer.findByPk(farmId)
    .then((farmer) => {
      return farmer.destroy().then((result) => {
        console.log(`Deleting from DB farmer with ID: ${farmId}`);
        res.redirect("farmers");
      });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("================ Done deleting ===============");
};
//POSST DELETE CATEGORIES

// TODO
// exports.getUserOrders = (req, res, next) => {
//   const orderId = req.params.order_id;
//   req.user.getUserOrders({where: {user_id}})
// }
