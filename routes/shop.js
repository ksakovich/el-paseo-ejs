const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

const { isAuthenticated } = require("../middleware/authentication-validation");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/categories", shopController.getCategories);

router.get("/categories/:categoryId", shopController.getSingleCategory);

router.get("/farmers", shopController.getFarmers);

router.get("/farmers/:farmerId", shopController.getSingleFarmer);

router.get("/products/:productId", shopController.getSingleProduct);

router.get("/cart", isAuthenticated, shopController.getCart);

router.post("/cart", isAuthenticated, shopController.postCart);

router.post("/cart-delete-item", isAuthenticated, shopController.postCartDeleteProduct);

router.get("/orders", isAuthenticated, shopController.getOrders);

router.post("/create-order", isAuthenticated, shopController.postOrder);

router.get("/checkout", isAuthenticated, shopController.getCheckout);

module.exports = router;
