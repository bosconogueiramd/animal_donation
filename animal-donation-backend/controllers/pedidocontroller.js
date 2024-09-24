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
    const { animal_id, user_id, status, message } = req.body;
    db.query('INSERT INTO pedidos (animal_id, user_id, status, message) VALUES (?, ?, ?, ?)', 
             [animal_id, user_id, status, message], 
             (error, results) => {
                 if (error) {
                     res.status(500).json({ error });
                 } else {
                     res.status(201).json({ message: 'Request created', id: results.insertId });
                 }
             });
};

// Update a request (Update)
const updateRequest = (req, res) => {
    const { id } = req.params;
    const { status, message } = req.body;
    db.query('UPDATE pedidos SET status = ?, message = ? WHERE id = ?', 
             [status, message, id], 
             (error) => {
                 if (error) {
                     res.status(500).json({ error });
                 } else {
                     res.status(200).json({ message: 'Request updated' });
                 }
             });
};

// Delete a request (Delete)
const deleteRequest = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pedidos WHERE id = ?', [id], (error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Request deleted' });
        }
    });
};

module.exports = { getAllRequests, createRequest, updateRequest, deleteRequest };
