// controllers/pedidocontroller.js
const db = require('../db');

// Get all requests (Read)
const getAllRequests = (req, res) => {
    db.query('SELECT * FROM pedidos', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
};

// Create a new request (Create)
const createRequest = (req, res) => {
    const { usuario_id, animal_id, status, data_pedido } = req.body;
    db.query(
        'INSERT INTO pedidos (usuario_id, animal_id, status, data_pedido) VALUES (?, ?, ?, ?)', 
        [usuario_id, animal_id, status, data_pedido], 
        (error, results) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(201).json({ message: 'Pedido criado', id: results.insertId });
            }
        }
    );
};

// Update a request (Update)
const updateRequest = (req, res) => {
    const { id } = req.params;
    const { status, data_pedido } = req.body;
    db.query(
        'UPDATE pedidos SET status = ?, data_pedido = ? WHERE id = ?', 
        [status, data_pedido, id], 
        (error) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json({ message: 'Pedido atualizado' });
            }
        }
    );
};

// Delete a request (Delete)
const deleteRequest = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pedidos WHERE id = ?', [id], (error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Pedido excluído' });
        }
    });
};

module.exports = { getAllRequests, createRequest, updateRequest, deleteRequest };
