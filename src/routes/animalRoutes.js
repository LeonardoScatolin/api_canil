const express = require('express');
const router = express.Router();
const animalController = require('../controller/animalController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', animalController.getAll);
router.get('/:id', animalController.getById);

// Rotas privadas
router.post('/', animalController.create);
router.put('/:id', animalController.update);
router.delete('/:id', animalController.delete);

module.exports = router;
