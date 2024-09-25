const express = require('express');
const router = express.Router();
const { getAllRequests, createRequest, updateRequest, deleteRequest } = require('../controllers/pedidocontroller');

// Route to get all requests
router.get('/', getAllRequests);

// Route to create a new request
router.post('/', createRequest);

// Route to update a request by ID
router.put('/:id', updateRequest);

// Route to delete a request by ID
router.delete('/:id', deleteRequest);

module.exports = router;
