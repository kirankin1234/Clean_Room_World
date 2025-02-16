const express = require('express');
const {  addCategory, getCategories } = require('../controllers/categoryController');

const router = express.Router();

router.post('/add', addCategory);
router.get('/get', getCategories);
// router.get('/:categoryId/subcategory', getSubcategories);


module.exports = router;
