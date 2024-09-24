const db = require('../db');

// Get all categories (Read)
const getAllCategories = (req, res) => {
    db.query('SELECT * FROM categoriaanimais', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
};

// Create a new category (Create)
const createCategory = (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO categoriaanimais (name, description) VALUES (?, ?)', 
             [name, description], 
             (error, results) => {
                 if (error) {
                     res.status(500).json({ error });
                 } else {
                     res.status(201).json({ message: 'Category created', id: results.insertId });
                 }
             });
};

// Update a category (Update)
const updateCategory = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.query('UPDATE categoriaanimais SET name = ?, description = ? WHERE id = ?', 
             [name, description, id], 
             (error) => {
                 if (error) {
                     res.status(500).json({ error });
                 } else {
                     res.status(200).json({ message: 'Category updated' });
                 }
             });
};

// Delete a category (Delete)
const deleteCategory = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categoriaanimais WHERE id = ?', [id], (error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Category deleted' });
        }
    });
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
