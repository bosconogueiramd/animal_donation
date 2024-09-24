const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/user');

// Route to get all users
router.get('/', getAllUsers);

// Route to create a new user
router.post('/', createUser);

// Route to update a user by ID
router.put('/:id', updateUser);

// Route to delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router;
