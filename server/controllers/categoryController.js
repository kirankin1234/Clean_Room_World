const Category = require('../models/CategoryModel');
// const Subcategory = require('../models/SubcategoryModel');
const Subcategory = require('../models/SubcategoryModel');


// Add Category
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();

    res.status(201).json(category);  // returning the ofject of category
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



// Get Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.getSubcategories = async (req, res) => {
  try {
    const { category } = req.params; // categoryName from URL

    console.log("Category received from frontend:", category); // Debugging log


    // Find the category by name
    // const categoryData = await Category.findOne({ name: category });
    const categoryData = await Category.findOne({
      name: { $regex: new RegExp("^" + category + "$", "i") },
    });
    

    if (!categoryData) {
      console.log("Category not found in DB:", category);   // Debugging log

      return res.status(404).json({ message: "Category not found" });
    }

    // Fetch subcategories linked to this category ID
    const subcategories = await Subcategory.find({ categoryId: categoryData._id });

    if (subcategories.length === 0) {
      return res.status(404).json({ message: "No subcategories found" });
    }

    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};


//lastly remove the debuggin log from the code