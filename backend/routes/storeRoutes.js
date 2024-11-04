const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  getProductDetails,
  getAllCategories,
} = require("../controllers/storeController");

// Get all products
router.get("/products", getAllProducts);

// Add a new product
router.post("/products", addProduct);

// Get detailed view of a product (includes seller info)
router.get("/products/:id", getProductDetails);

// New route for fetching all categories
router.get("/categories", getAllCategories);

module.exports = router;
