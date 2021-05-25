const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

// /admin/add-category => GET
router.get("/add-category", adminController.getAddCategory);

router.get("/categories", adminController.getCategories);

router.post("/add-category", adminController.postAddCategory);

router.get("/edit-category/:categoryId", adminController.getEditCategory);

router.post("/edit-category", adminController.postEditCategory);

router.post("/delete-category", adminController.postDeleteCategory);

//Farmers
router.get("/add-farmer", adminController.getAddFarmer);

router.get("/farmers", adminController.getFarmers);

router.post("/add-farmer", adminController.postAddFarmer);

router.get("/edit-farmer/:farmerId", adminController.getEditFarmer);

router.post("/edit-farmer/");

module.exports = router;
