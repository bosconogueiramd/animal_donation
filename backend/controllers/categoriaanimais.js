// controllers/categoriaanimais.js
const db = require('../db');

// Get all categories (Read)
const getAllCategories = (req, res) => {
    db.query('SELECT * FROM categorias', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
};

// Create a new category (Create)
const createCategory = (req, res) => {
    const { nome } = req.body;
    db.query(
        'INSERT INTO categorias (nome) VALUES (?)', 
        [nome], 
        (error, results) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(201).json({ message: 'Categoria criada', id: results.insertId });
            }
        }
    );
};

// Update a category (Update)
const updateCategory = (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    db.query(
        'UPDATE categorias SET nome = ? WHERE id = ?', 
        [nome, id], 
        (error) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json({ message: 'Categoria atualizada' });
            }
        }
    );
};

// Delete a category (Delete)
const deleteCategory = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categorias WHERE id = ?', [id], (error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Categoria excluída' });
        }
    });
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
