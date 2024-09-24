const express = require('express');
const router = express.Router();
const { getAllAnimals, createAnimal, updateAnimal, deleteAnimal } = require('../controllers/animais');

// Route to get all animals
router.get('/', getAllAnimals);

// Route to create a new animal
router.post('/', createAnimal);

// Route to update an animal by ID
router.put('/:id', updateAnimal);

// Route to delete an animal by ID
router.delete('/:id', deleteAnimal);

module.exports = router;
