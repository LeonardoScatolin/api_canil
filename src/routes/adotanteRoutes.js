const express = require('express');
const router = express.Router();
const adotanteController = require('../controller/adotanteController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', adotanteController.getAll);
router.get('/:id', adotanteController.getById);

// Rotas privadas
router.post('/', adotanteController.create);
router.put('/:id', adotanteController.update);
router.delete('/:id', adotanteController.delete);

module.exports = router;
