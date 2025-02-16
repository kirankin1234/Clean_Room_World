const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // subcategories: [{ type: String }] // Storing subcategories as an array of strings
});

module.exports = mongoose.model('Category', categorySchema);
