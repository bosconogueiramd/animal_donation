// controllers/user.js
const db = require('../db');

// Get all users (Read)
const getAllUsers = (req, res) => {
    db.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
};

// Create a new user (Create)
const createUser = (req, res) => {
    const { nome, email, senha, data_criacao } = req.body;
    db.query(
        'INSERT INTO usuarios (nome, email, senha, data_criacao) VALUES (?, ?, ?, ?)', 
        [nome, email, senha, data_criacao], 
        (error, results) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(201).json({ message: 'Usuário criado', id: results.insertId });
            }
        }
    );
};

// Update a user (Update)
const updateUser = (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, data_criacao } = req.body;
    db.query(
        'UPDATE usuarios SET nome = ?, email = ?, senha = ?, data_criacao = ? WHERE id = ?', 
        [nome, email, senha, data_criacao, id], 
        (error) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json({ message: 'Usuário atualizado' });
            }
        }
    );
};

// Delete a user (Delete)
const deleteUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Usuário excluído' });
        }
    });
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
