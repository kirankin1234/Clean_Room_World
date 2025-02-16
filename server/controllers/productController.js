const Product = require("../models/ProductModel");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, size, color, categoryId, subCategoryId } = req.body;

    if (!subCategoryId) {
      return res.status(400).json({ message: "Subcategory are required" });
    }

    const newProduct = new Product({
      name,
      description,
      size,
      color,
      // categoryId,
      subCategoryId,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId subCategoryId");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

exports.getProductsBySubcategory = async (req, res) => {
    try {
      const { subcategory } = req.params;
      
      // Find products linked to this subcategory
      const products = await Product.find({ subcategory });

      if (!products.length) {
        return res.status(404).json({ message: "No products found for this subcategory" });
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products", error });
    }
  };