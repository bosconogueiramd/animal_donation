// routes/categoriaanimais.js
const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoriaanimais'); // Verifique se os nomes das funções estão corretos

// Route to get all categories
router.get('/', getAllCategories);

// Route to create a new category
router.post('/', createCategory);

// Route to update a category by ID
router.put('/:id', updateCategory);

// Route to delete a category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
