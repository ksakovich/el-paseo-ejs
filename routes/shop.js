const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/category", shopController.getCategories);

router.get("/farmers", shopController.getFarmers);

router.get("/farmers/:farmerId", shopController.getSingleFarmer);

router.get("/products/:productId", shopController.getSingleProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.get("/orders", shopController.getOrders);

router.post("/create-order", shopController.postOrder);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
