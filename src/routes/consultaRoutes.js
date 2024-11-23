const express = require('express');
const router = express.Router();
const consultaController = require('../controller/consultaController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', consultaController.getAll);
router.get('/:id', consultaController.getById);

// Rotas privadas
router.post('/', consultaController.create);
router.put('/:id', consultaController.update);
router.delete('/:id', consultaController.delete);

module.exports = router;
