const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

const { isAdmin } = require("../middleware/authentication-validation");

const { isAuthenticated } = require("../middleware/authentication-validation");

// /admin/add-product => GET
router.get("/add-product", isAuthenticated, isAdmin, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuthenticated, isAdmin, adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", isAuthenticated, isAdmin, adminController.postAddProduct);

router.get("/edit-product/:productId", isAuthenticated, isAdmin, adminController.getEditProduct);

router.post("/edit-product", isAuthenticated, isAdmin, adminController.postEditProduct);

router.post("/delete-product", isAuthenticated, isAdmin, adminController.postDeleteProduct);

// /admin/add-category => GET
router.get("/add-category", isAuthenticated, isAdmin, adminController.getAddCategory);

router.get("/categories", isAuthenticated, isAdmin, adminController.getCategories);

router.post("/add-category", isAuthenticated, isAdmin, adminController.postAddCategory);

router.get("/edit-category/:categoryId", isAuthenticated, isAdmin, adminController.getEditCategory);

router.post("/edit-category", isAuthenticated, isAdmin, adminController.postEditCategory);

router.post("/delete-category", isAuthenticated, isAdmin, adminController.postDeleteCategory);

//Farmers
router.get("/add-farmer", isAuthenticated, isAdmin, adminController.getAddFarmer);

router.get("/farmers", isAuthenticated, isAdmin, adminController.getFarmers);

router.post("/add-farmer", adminController.postAddFarmer);

router.get("/edit-farmer/:farmerId", adminController.getEditFarmer);

router.post("/edit-farmer/", adminController.postEditFarmer);

router.post("/delete-farmer", adminController.postDeleteFarmer);

module.exports = router;
