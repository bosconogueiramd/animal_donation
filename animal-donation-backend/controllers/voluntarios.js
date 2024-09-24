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
    const { name, email, phone, skills } = req.body;
    db.query('INSERT INTO voluntarios (name, email, phone, skills) VALUES (?, ?, ?, ?)', 
             [name, email, phone, skills], 
             (error, results) => {
                 if (error) {
                     res.status(500).json({ error });
                 } else {
                     res.status(201).json({ message: 'Volunteer created', id: results.insertId });
                 }
             });
};

// Update a volunteer (Update)
const updateVolunteer = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, skills } = req.body;
    db.query('UPDATE voluntarios SET name = ?, email = ?, phone = ?, skills = ? WHERE id = ?', 
             [name, email, phone, skills, id], 
             (error) => {
                 if (error) {
                     res.status(500).json({ error });
                 } else {
                     res.status(200).json({ message: 'Volunteer updated' });
                 }
             });
};

// Delete a volunteer (Delete)
const deleteVolunteer = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM voluntarios WHERE id = ?', [id], (error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Volunteer deleted' });
        }
    });
};

module.exports = { getAllVolunteers, createVolunteer, updateVolunteer, deleteVolunteer };
