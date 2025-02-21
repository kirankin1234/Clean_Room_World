const { message } = require("statuses");
const Product = require("../models/ProductModel");

exports.addProduct = async (req, res) => {
  try {
      const { category, subcategory, productName, price, productCode, description, size, image } = req.body;

      if (!category || !subcategory || !productName || !price || !productCode || !description || !image) {
          return res.status(400).json({ message: "All required fields must be filled" });
      }

      const newProduct = new Product({
          category,
          subcategory,
          productName,
          price,
          productCode,
          description,
          size,
          image,
          // message: 'Product added successfully'
      });

      await newProduct.save();
      res.status(201).json({ message: "Product added successfully", product: newProduct });

  } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Server error, please try again later" });
  }
};



exports.getProducts = async (req, res) => {
  console.log("Incoming Request:", req.body);

    const { categoryId, subcategoryId } = req.body;
    if (!categoryId || !subcategoryId) {
        return res.status(400).json({ error: "Category ID and Subcategory ID are required" });
    }

    try {
        const products = await Product.find({ category: categoryId, subcategory: subcategoryId });
        res.json({
          products,
          message : "Products fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
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


exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

      if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        updatedProduct,
        message: "Product updated successfully",
      
      });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
}