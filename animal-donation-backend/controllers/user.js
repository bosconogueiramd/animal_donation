const db = require('../db');

// Get all users (Read)
const getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
};

// Create a new user (Create)
const createUser = (req, res) => {
    const { name, email, password } = req.body;
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
             [name, email, password], 
             (error, results) => {
                 if (error) {
                     res.status(500).json({ error });
                 } else {
                     res.status(201).json({ message: 'User created', id: results.insertId });
                 }
             });
};

// Update a user (Update)
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', 
             [name, email, password, id], 
             (error) => {
                 if (error) {
                     res.status(500).json({ error });
                 } else {
                     res.status(200).json({ message: 'User updated' });
                 }
             });
};

// Delete a user (Delete)
const deleteUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'User deleted' });
        }
    });
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
