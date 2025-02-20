const express = require("express");
const { addProduct, getProducts, getProductsBySubcategory, deleteProduct, updateProduct  } = require("../controllers/productController");

const router = express.Router();
// Add a Product
router.post("/add", addProduct);

// Get All Products
router.get("/get", getProducts);

//delete a product
router.delete("/delete/:id", deleteProduct);

//update a product
router.put("/update/:id", updateProduct);

// Get Products by Subcategory
router.get("/subcategory/:subcategory/products", getProductsBySubcategory);

module.exports = router;
