const express = require("express");
const { addProduct, getProducts, getProductsBySubcategory } = require("../controllers/productController");

const router = express.Router();
// Add a Product
router.post("/add", addProduct);

// Get All Products
router.get("/get", getProducts);

// Get Products by Subcategory
router.get("/subcategory/:subcategory/products", getProductsBySubcategory);

module.exports = router;
