// controllers/voluntarios.js
const db = require('../db');

// Get all volunteers (Read)
const getAllVolunteers = (req, res) => {
    db.query('SELECT * FROM voluntarios', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
};

// Create a new volunteer (Create)
const createVolunteer = (req, res) => {
    const { nome, email, telefone, data_registro } = req.body;
    db.query(
        'INSERT INTO voluntarios (nome, email, telefone, data_registro) VALUES (?, ?, ?, ?)', 
        [nome, email, telefone, data_registro], 
        (error, results) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(201).json({ message: 'Voluntário criado', id: results.insertId });
            }
        }
    );
};

// Update a volunteer (Update)
const updateVolunteer = (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, data_registro } = req.body;
    db.query(
        'UPDATE voluntarios SET nome = ?, email = ?, telefone = ?, data_registro = ? WHERE id = ?', 
        [nome, email, telefone, data_registro, id], 
        (error) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json({ message: 'Voluntário atualizado' });
            }
        }
    );
};

// Delete a volunteer (Delete)
const deleteVolunteer = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM voluntarios WHERE id = ?', [id], (error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Voluntário excluído' });
        }
    });
};

module.exports = { getAllVolunteers, createVolunteer, updateVolunteer, deleteVolunteer };
