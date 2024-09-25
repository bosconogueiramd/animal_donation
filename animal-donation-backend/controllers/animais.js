// controllers/animais.js
const db = require('../db');

// Get all animals (Read)
const getAllAnimals = (req, res) => {
    db.query('SELECT * FROM animais', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
};

// Create a new animal (Create)
const createAnimal = (req, res) => {
    const { nome, idade, descricao, categoria_id, data_registro, raca } = req.body;
    db.query(
        'INSERT INTO animais (nome, idade, descricao, categoria_id, data_registro, raca) VALUES (?, ?, ?, ?, ?, ?)',
        [nome, idade, descricao, categoria_id, data_registro, raca],
        (error, results) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(201).json({ message: 'Animal criado', id: results.insertId });
            }
        }
    );
};

// Update an animal (Update)
const updateAnimal = (req, res) => {
    const { id } = req.params;
    const { nome, idade, descricao, categoria_id, data_registro, raca } = req.body;
    db.query(
        'UPDATE animais SET nome = ?, idade = ?, descricao = ?, categoria_id = ?, data_registro = ?, raca = ? WHERE id = ?',
        [nome, idade, descricao, categoria_id, data_registro, raca, id],
        (error) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json({ message: 'Animal atualizado' });
            }
        }
    );
};

// Delete an animal (Delete)
const deleteAnimal = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM animais WHERE id = ?', [id], (error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Animal excluído' });
        }
    });
};

module.exports = { getAllAnimals, createAnimal, updateAnimal, deleteAnimal };
