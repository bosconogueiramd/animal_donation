const express = require('express');
const router = express.Router();
const { getAllVolunteers, createVolunteer, updateVolunteer, deleteVolunteer } = require('../controllers/voluntarios');

// Route to get all volunteers
router.get('/', getAllVolunteers);

// Route to create a new volunteer
router.post('/', createVolunteer);

// Route to update a volunteer by ID
router.put('/:id', updateVolunteer);

// Route to delete a volunteer by ID
router.delete('/:id', deleteVolunteer);

module.exports = router;
