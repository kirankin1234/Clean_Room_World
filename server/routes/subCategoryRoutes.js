const express = require("express");
const {getSubcategories, addSubCategory, getSubCategories } = require("../controllers/subCategoryController");

const router = express.Router();

// Add Subcategory Route
router.post("/add", addSubCategory);

// Get Subcategories Route
router.get("/get", getSubCategories);

router.get("/:categoryName", getSubcategories);


module.exports = router;
