const mongoose = require("mongoose");
const SubCategory = require("../models/SubcategoryModel");
const Category = require("../models/CategoryModel");

// Add Subcategory to Database
const addSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    // Check for invalid categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      console.error("Invalid categoryId:", categoryId);
      return res.status(400).json({ message: "Invalid categoryId format" });
    }

    console.log("Received Data:", { name, categoryId });

    const subCategory = new SubCategory({
      categoryId: new mongoose.Types.ObjectId(categoryId), // Convert to ObjectId
      name,
    });
    await subCategory.save();

    res.status(201).json(subCategory);
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(500).json({ message: "Error adding subcategory", error: error.message });
  }
};

//  Get all Subcategories
const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

//  Get Subcategories by Category Name
const getSubcategories = async (req, res) => {
  try {
    console.log("Request Params:", req); // Debugging
    const { categoryName } = req.params;
    console.log("Requested Category:", categoryName); // Debugging

    // Find category object
    const categoryData = await Category.findOne({
      name: { $regex: new RegExp("^" + categoryName + "$", "i") }, // Case-insensitive match
    });

    if (!categoryData) {
      console.log("Category not found:", categoryName);
      return res.status(404).json({ message: "Category not found" });
    }

    console.log("Found Category:", categoryData);

    // Fetch subcategories based on category ID
    const subcategories = await SubCategory.find({ categoryId: categoryData._id });

    console.log("Subcategories:", subcategories);

    res.json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

// Export all functions
module.exports = { addSubCategory, getSubCategories, getSubcategories };
