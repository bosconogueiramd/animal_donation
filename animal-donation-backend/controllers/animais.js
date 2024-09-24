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
    const { name, age, breed, description } = req.body;
    db.query('INSERT INTO animais (name, age, breed, description) VALUES (?, ?, ?, ?)', 
             [name, age, breed, description], 
             (error, results) => {
                 if (error) {
                     res.status(500).json({ error });
                 } else {
                     res.status(201).json({ message: 'Animal created', id: results.insertId });
                 }
             });
};

// Update an animal (Update)
const updateAnimal = (req, res) => {
    const { id } = req.params;
    const { name, age, breed, description } = req.body;
    db.query('UPDATE animais SET name = ?, age = ?, breed = ?, description = ? WHERE id = ?', 
             [name, age, breed, description, id], 
             (error) => {
                 if (error) {
                     res.status(500).json({ error });
                 } else {
                     res.status(200).json({ message: 'Animal updated' });
                 }
             });
};

// Delete an animal (Delete)
const deleteAnimal = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM animais WHERE id = ?', [id], (error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Animal deleted' });
        }
    });
};

module.exports = { getAllAnimals, createAnimal, updateAnimal, deleteAnimal };
